import { useEffect } from "react";

function CrashTest({ getCrashTest }) {
  useEffect(() => {
    getCrashTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default CrashTest;
