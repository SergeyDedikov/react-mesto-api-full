import { useEffect } from "react";
import { Link } from "react-router-dom";

function CrashTest({ getCrashTest, handleTokenCheck }) {
  useEffect(() => {
    getCrashTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p className="authentication__text">
        Сейчас произойдёт краш-тест сервера!
      </p>
      <p className="authentication__text">
        Подождите несколько секунд и возвращайтесь
      </p>
      <p className="authentication__text">
        <button
          onClick={handleTokenCheck}
          className="button link"
          type="button"
        >
          <Link to="/" className="button link">
            &#62;&#62;&#62; НАЗАД &#60;&#60;&#60;
          </Link>
        </button>
      </p>
    </>
  );
}

export default CrashTest;
