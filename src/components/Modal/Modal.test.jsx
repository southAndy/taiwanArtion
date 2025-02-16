import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../../src/components/Modal";

describe("Modal 元件顯示受 props 值 isShow 影響", () => {
  it("當為 true 時，元件 display 應為 block", () => {
    render(<Modal isShow={true} />);
    const modalBackground = screen.getByTestId("modal-background");
    expect(modalBackground).toHaveStyle("display: block");
  });

  it("當為 false 時，元件 display 應為 none", () => {
    render(<Modal isShow={false} />);
    const modalBackground = screen.queryByTestId("modal-background");
    expect(modalBackground).toHaveStyle("display: none");
  });
});

describe("Modal 元件的 props 樣式", () => {
  test("元件絕對定位會受到 top, bottom, right, left 等 props 值影響", () => {
    const { container } = render(
      <Modal
        isShow={true}
        position={{ t: "10px", b: "20px", r: "30px", l: "40px" }}
      />
    );
    const element = container.querySelector(".modal-content");

    expect(element).toHaveStyle("top: 10px");
    expect(element).toHaveStyle("bottom: 20px");
    expect(element).toHaveStyle("right: 30px");
    expect(element).toHaveStyle("left: 40px");
  });
});
