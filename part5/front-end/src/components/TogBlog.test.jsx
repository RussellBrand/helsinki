import { cleanup, render, screen } from "@testing-library/react";
// import Blog from "./Blog";
import { expect } from "vitest";
// import { url } from "inspector";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import React from "react";
// import Togglable from "./TogBlox";

const Togglable = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const showContent = () => {
    // console.log("showContent");
    setIsVisible(true);
  };

  const hideContent = () => {
    // console.log("hideContent");
    setIsVisible(false);
  };

  if (isVisible) {
    return (
      <div className="isvisble>">
        {/* <div>Visible: {isVisible}</div> */}
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { hideContent });
        })}
        <button className="cancel-button" onClick={hideContent}>
          Cancel
        </button>
      </div>
    );
  }
  return (
    <div className="isnotvisible">
      {/* <div>Visible: {isVisible}</div> */}
      <button className="show-button" onClick={showContent}>
        Show
      </button>
    </div>
  );
};
const FakeBlogForm = ({ hideContent }) => {
  return (
    <div className="blog-form">
      hello<div>I am a FakeBlogForm!</div>
      <button className="submit-button" onClick={hideContent}>
        Submit
      </button>
    </div>
  );
};

const ExpandableForm = () => {
  // const togglableRef = useRef();
  // ref={togglableRef}
  return (
    <div>
      <Togglable>
        <FakeBlogForm />
      </Togglable>
    </div>
  );
};

describe("Initial Render of Toggler", () => {
  const { container: topbox } = render(<ExpandableForm />);

  // screen.debug(); //?
  test("TogBlox renders a show button", () => {
    const showbutton = topbox.querySelector(".show-button"); //?
    expect(showbutton).toBeTruthy();
  });
  test("TogBlox does not renders a blog-form", () => {
    const togblox = topbox.querySelector(".blogform");
    expect(togblox).toBeFalsy();
  });
});

describe("TogBlox Press show button", () => {
  let topbox = null;
  let showButton = null;
  beforeEach(async () => {
    const render_result = render(<ExpandableForm />);
    topbox = render_result.container;
    showButton = topbox.querySelector(".show-button");
    expect(showButton).toBeTruthy();
    await showButton.click();
  });
  test("does renders a blog-form", async () => {
    const blogform = topbox.querySelector(".blog-form");

    expect(blogform).toBeTruthy();
  });
  test("does not render a show button", async () => {
    const showbutton = topbox.querySelector(".show-button");
    expect(showbutton).toBeFalsy();
  });
  test("does show a canel button", async () => {
    const cancelButton = topbox.querySelector(".cancel-button");
    expect(cancelButton).toBeTruthy();
  });
});

describe("TogBlox Press cancel button", () => {
  let topbox = null;
  let cancelButton = null;
  beforeEach(async () => {
    const render_result = render(<ExpandableForm />);
    topbox = render_result.container;
    const showButton = topbox.querySelector(".show-button");
    await showButton.click();
    cancelButton = topbox.querySelector(".cancel-button");
    expect(cancelButton).toBeTruthy();
    await cancelButton.click();
  });
  test("does not render a blog-form", async () => {
    const blogform = topbox.querySelector(".blog-form");
    expect(blogform).toBeFalsy();
  });
  test("does render a show button", async () => {
    const showbutton = topbox.querySelector(".show-button");
    expect(showbutton).toBeTruthy();
  });
  test("does not show a cancel button", async () => {
    const cancelButton = topbox.querySelector(".cancel-button");
    expect(cancelButton).toBeFalsy();
  });
  test("does render a show button", async () => {
    const showbutton = topbox.querySelector(".show-button");
    expect(showbutton).toBeTruthy();
  });
});

describe("TogBlox Press submit button", () => {
  let topbox = null;
  let submitButton = null;
  beforeEach(async () => {
    const render_result = render(<ExpandableForm />);
    topbox = render_result.container;
    const showButton = topbox.querySelector(".show-button");
    await showButton.click();
    submitButton = topbox.querySelector(".submit-button");
    expect(submitButton).toBeTruthy();
    await submitButton.click();
    render_result.debug(); //?
  });
  test("does not render a blog-form", async () => {
    const blogform = topbox.querySelector(".blog-form");
    expect(blogform).toBeFalsy();
  });
  test("does render a show button", async () => {
    const showbutton = topbox.querySelector(".show-button");
    expect(showbutton).toBeTruthy();
  });
  test("does not show a submit button", async () => {
    const submitButton = topbox.querySelector(".submit-button");
    expect(submitButton).toBeFalsy();
  });
  test("does render a show button", async () => {
    const showbutton = topbox.querySelector(".show-button");
    expect(showbutton).toBeTruthy();
  });
});
