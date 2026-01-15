import React, { useEffect, useMemo, useState } from "react";
import { Viewer } from "aleph-r3f";
import "aleph-r3f/dist/style.css";

type AlephIIIFProps = {
  manifest: string | Record<string, unknown>;
  envPreset?: string;
  rotationPreset?: [number, number, number];
};

const isModelUrl = (value: unknown) =>
  typeof value === "string" && /\.gl(b|tf)(\?|#|$)/i.test(value);

const isModelFormat = (value: unknown) =>
  typeof value === "string" && value.toLowerCase().startsWith("model/");

const extractModelUrl = (data: unknown): string | null => {
  if (isModelUrl(data)) return data as string;

  if (Array.isArray(data)) {
    for (const item of data) {
      const found = extractModelUrl(item);
      if (found) return found;
    }
    return null;
  }

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const url =
      (typeof record.id === "string" && record.id) ||
      (typeof record["@id"] === "string" && (record["@id"] as string)) ||
      (typeof record.url === "string" && record.url) ||
      (typeof record.href === "string" && record.href) ||
      "";

    if (url && (isModelUrl(url) || isModelFormat(record.format))) {
      return url;
    }

    for (const key of Object.keys(record)) {
      const found = extractModelUrl(record[key]);
      if (found) return found;
    }
  }

  return null;
};

const AlephIIIF: React.FC<AlephIIIFProps> = ({
  manifest,
  envPreset = "studio",
  rotationPreset
}) => {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const manifestKey = useMemo(
    () => (typeof manifest === "string" ? manifest : JSON.stringify(manifest)),
    [manifest]
  );

  useEffect(() => {
    let isMounted = true;

    const resolve = async () => {
      try {
        setError(null);
        setSrc(null);
        setIsReady(false);

        if (typeof manifest !== "string") {
          const found = extractModelUrl(manifest);
          if (!found) {
            throw new Error("IIIF manifestist ei leitud glTF/GLB faili.");
          }
          if (isMounted) setSrc(found);
          return;
        }

        if (isModelUrl(manifest)) {
          if (isMounted) setSrc(manifest);
          return;
        }

        const response = await fetch(manifest);
        if (!response.ok) {
          throw new Error("Manifesti laadimine ebaonnestus.");
        }
        const json = await response.json();
        const found = extractModelUrl(json);
        if (!found) {
          throw new Error("IIIF manifestist ei leitud glTF/GLB faili.");
        }
        if (isMounted) setSrc(found);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "3D vaaturi viga.");
        }
      }
    };

    resolve();

    return () => {
      isMounted = false;
    };
  }, [manifestKey]);

  if (error) {
    return <div className="iiif-error">{error}</div>;
  }

  if (!src) {
    return <div className="iiif-loading">Laen 3D mudelit...</div>;
  }

  return (
    <div className="iiif-3d-stage">
      {!isReady && <div className="iiif-loading iiif-loading--overlay">Laen 3D mudelit...</div>}
      <Viewer
        src={src}
        envPreset={envPreset}
        rotationPreset={rotationPreset}
        onLoad={() => setIsReady(true)}
      />
    </div>
  );
};

export default AlephIIIF;
