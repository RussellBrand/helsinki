import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const { children } = props;
  console.log("Togglable props: ", props);
  console.log("Togglable children: ", children);

  useImperativeHandle(ref, () => ({
    // hideContent: () => setIsVisible(false),
    hideContent: () => setIsVisible(true),
  }));

  const showContent = () => setIsVisible(true);

  return (
    <>
      <div>
        <button className="showButton" onClick={showContent}>
          show
        </button>
        <button className="hideButton" nClick={() => ref.current.hideContent()}>
          Hide
        </button>
        <div className="inner">
          HELLO silly
          <pre>{JSON.stringify(children, null, 2)} </pre>
        </div>
      </div>
    </>
  );
});

export default Togglable;
