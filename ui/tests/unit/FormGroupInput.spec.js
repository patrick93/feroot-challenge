import { shallowMount } from "@vue/test-utils";
import FormGroupInput from "../../src/components/FormGroupInput.vue";

describe("form group input component", () => {
  describe("when renders component", () => {
    const wrapper = shallowMount(FormGroupInput, {
      propsData: {
        value: "input value",
        label: "Input Label",
      },
    });

    it("should render label", () => {
      expect(wrapper.find("label").exists()).toBeTruthy();
      expect(wrapper.find("label").text()).toEqual("Input Label");
    });

    it("should render input", () => {
      expect(wrapper.find("input").exists()).toBeTruthy();
      expect(wrapper.find("input").element.value).toEqual("input value");
    });

    it("should add invalid class in input", () => {
      expect(wrapper.find("input").classes()).not.toContain("is-invalid");
    });

    it("should not render error message", () => {
      expect(wrapper.find(".test-error-message").exists()).toBeFalsy();
    });
  });

  describe("when update input value", () => {
    const wrapper = shallowMount(FormGroupInput, {
      propsData: {
        value: "input value",
        label: "Input Label",
      },
    });

    wrapper.find("input").setValue("new value");

    it("should emit an event with updated value", () => {
      expect(wrapper.emitted().input[0][0]).toEqual("new value");
    });
  });

  describe("when has error", () => {
    const wrapper = shallowMount(FormGroupInput, {
      propsData: {
        value: "input value",
        label: "Input Label",
        hasError: true,
        errorMessage: "Field is invalid",
      },
    });

    it("should add invalid class in input", () => {
      expect(wrapper.find("input").classes()).toContain("is-invalid");
    });

    it("should render error message", () => {
      expect(wrapper.find(".test-error-message").exists()).toBeTruthy();
      expect(wrapper.find(".test-error-message").text()).toEqual(
        "Field is invalid"
      );
    });
  });
});
