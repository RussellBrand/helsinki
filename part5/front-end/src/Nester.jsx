import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(true);
  const { showname } = props;

  useImperativeHandle(ref, () => ({
    hideContent: () => setIsVisible(false),
  }));

  const showContent = () => setIsVisible(true);

  return (
    <div>
      <button onClick={showContent}>NAME: {showname}</button>
      <button onClick={() => ref.current.hideContent()}>Hide</button>
      {isVisible && <div>{props.children}</div>}
    </div>
  );
});

////////////////////////////////////////////////////////////////////////////////

function ChildTwo(props) {
  const { hideContent, ...otherProps } = props;

  return (
    <div>
      <button onClick={hideContent}>Hide from ChildTwo</button>
      <pre>{JSON.stringify(otherProps, null, 4)}</pre>
    </div>
  );
}

///////////////////////

function OldChildTwo({ hideContent }) {
  // everything
  //const { hideContent } = everything;
  return (
    <div>
      <button onClick={hideContent}>Hide from ChildTwo</button>
      <pre>JSON.stringify(otherproperties, null, 4)</pre>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////

function Nester() {
  const togglableRef = useRef();

  return (
    <div>
      <h1>Welcome to the Togglable Component Example</h1>
      <Togglable ref={togglableRef} showname="reveal">
        <ChildOne />
        <ChildTwo hideContent={() => togglableRef.current.hideContent()} />
        <ChildThree />
      </Togglable>
    </div>
  );
}

function ChildOne() {
  return <div>ChildOne Content</div>;
}

function ChildThree() {
  return <div>ChildThree Content</div>;
}

////////////////////////////////////////////////////////////////////////////////

export default Nester;
