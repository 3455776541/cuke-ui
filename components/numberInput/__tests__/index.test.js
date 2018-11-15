import assert from "power-assert";
import React from "react";
import { render, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NumberInput, {
  getCleanString,
  getTheValueLengthAfterTheDecimalPoint
} from "../index";

describe("<NumberInput/>", () => {
  it("should render NumberInput", () => {
    const wrapper = render(<NumberInput />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should emit onChange events", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<NumberInput onChange={onChange} />);
    setTimeout(() => {
      wrapper.find("input").simulate("change");
      expect(onChange).toHaveBeenCalled();
    }, 20);
  });

  it("should cannot emit onChange events when disabled", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<NumberInput onChange={onChange} disabled />);
    setTimeout(() => {
      wrapper.find("input").simulate("change");
      expect(onChange).not.toHaveBeenCalled();
    }, 20);
  });

  it("should cannot emit onChange events when stepper disabled", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <NumberInput showStepper onChange={onChange} disabled />
    );
    setTimeout(() => {
      wrapper.find(".cuke-input-group-addon").simulate("click");
      expect(onChange).not.toHaveBeenCalled();
    }, 20);
  });

  it("should render custom step", () => {
    const wrapper = shallow(<NumberInput value={1} showStepper step={2} />);
    setTimeout(() => {
      wrapper
        .find(".cuke-input-group-addon")
        .at(1)
        .simulate("click");
      expect(wrapper.state().value).toBe(3);
    }, 20);
  });

  it("getTheValueLengthAfterTheDecimalPoint", () => {
    assert(getTheValueLengthAfterTheDecimalPoint("19.222", 2) === "19.22");
    assert(getTheValueLengthAfterTheDecimalPoint("199", 2) === "199");
    assert(
      getTheValueLengthAfterTheDecimalPoint("19.222.222.22", 2) ===
        "19.22.22.22"
    );
  });

  it("should get clean string", () => {
    assert(getCleanString(123) === "123");
    assert(getCleanString("123") === "123");
    assert(getCleanString("123abc") === "123");
    assert(getCleanString("123abc.3") === "123.3");
    assert(getCleanString([]) === "");
  });
});
