import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Vuelidate from "vuelidate";
import SignUp from "../../src/views/SignUp.vue";

import authService from "../../src/services/auth.service";

jest.mock("../../src/services/auth.service");

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe("SignUp.vue", () => {
  describe("when renders the component", () => {
    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    it("should render header", () => {
      expect(wrapper.find("h4").text()).toEqual("Please Sign Up");
    });

    it("should render name input", () => {
      expect(wrapper.find(".test-name").exists()).toBeTruthy();
    });

    it("should render email input", () => {
      expect(wrapper.find(".test-email").exists()).toBeTruthy();
    });

    it("should render password input", () => {
      expect(wrapper.find(".test-password").exists()).toBeTruthy();
    });

    it("should render repeat-password input", () => {
      expect(wrapper.find(".test-repeat-password").exists()).toBeTruthy();
    });

    it("should render sign up button", () => {
      const buttonEl = wrapper.find("button");
      expect(buttonEl.exists()).toBeTruthy();
      expect(buttonEl.text()).toEqual("Sign Up");
    });

    it("should render footer", () => {
      expect(wrapper.find(".test-footer span").text()).toEqual(
        "Already have an account?"
      );
    });

    it("should render link that redirect to sign in", () => {
      expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
        name: "sign-in",
      });
      expect(wrapper.findComponent(RouterLinkStub).text()).toEqual("Sign in");
    });
  });

  describe("when click on sign up button with valid input", () => {
    const userData = {
      name: "User Name",
      email: "user@email.com",
      password: "pass",
      repeatPassword: "pass",
    };

    const router = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $router: router,
      },
    });

    beforeEach(async () => {
      authService.signUp = jest.fn();

      await wrapper.setData({
        user: userData,
      });

      await wrapper.find("button").trigger("click");
    });

    it("should call sign up on authService", () => {
      expect(authService.signUp).toHaveBeenCalledWith(userData);
    });

    it("should redirect to sign in page", () => {
      expect(router.push).toHaveBeenCalledWith({
        name: "sign-in",
        params: { userRegisteredSuccessfully: true },
      });
    });
  });

  describe("when name input is empty", () => {
    const userData = {
      name: "",
      email: "user@email.com",
      password: "pass",
      repeatPassword: "pass",
    };

    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    beforeEach(async () => {
      await wrapper.setData({
        user: userData,
      });

      wrapper.vm.$v.user.name.$touch();

      await wrapper.vm.$nextTick();
    });

    it("should show error message", () => {
      expect(wrapper.find(".test-name").props().hasError).toBeTruthy();
      expect(wrapper.find(".test-name").props().errorMessage).toEqual(
        "Name is required"
      );
    });

    it("should disable sign up button", () => {
      expect(wrapper.find("button").element.disabled).toBeTruthy();
    });
  });

  describe("when email input is empty", () => {
    const userData = {
      name: "User Name",
      email: "",
      password: "pass",
      repeatPassword: "pass",
    };

    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    beforeEach(async () => {
      await wrapper.setData({
        user: userData,
      });

      wrapper.vm.$v.user.email.$touch();

      await wrapper.vm.$nextTick();
    });

    it("should show error message", () => {
      expect(wrapper.find(".test-email").props().hasError).toBeTruthy();
      expect(wrapper.find(".test-email").props().errorMessage).toEqual(
        "Invalid email"
      );
    });

    it("should disable sign up button", () => {
      expect(wrapper.find("button").element.disabled).toBeTruthy();
    });
  });

  describe("when email input is invalid", () => {
    const userData = {
      name: "User Name",
      email: "email",
      password: "pass",
      repeatPassword: "pass",
    };

    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    beforeEach(async () => {
      await wrapper.setData({
        user: userData,
      });

      wrapper.vm.$v.user.email.$touch();

      await wrapper.vm.$nextTick();
    });

    it("should show error message", () => {
      expect(wrapper.find(".test-email").props().hasError).toBeTruthy();
      expect(wrapper.find(".test-email").props().errorMessage).toEqual(
        "Invalid email"
      );
    });

    it("should disable sign up button", () => {
      expect(wrapper.find("button").element.disabled).toBeTruthy();
    });
  });

  describe("when password input is empty", () => {
    const userData = {
      name: "User Name",
      email: "user@email.com",
      password: "",
      repeatPassword: "pass",
    };

    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    beforeEach(async () => {
      await wrapper.setData({
        user: userData,
      });

      wrapper.vm.$v.user.password.$touch();

      await wrapper.vm.$nextTick();
    });

    it("should show error message", () => {
      expect(wrapper.find(".test-password").props().hasError).toBeTruthy();
      expect(wrapper.find(".test-password").props().errorMessage).toEqual(
        "Password is required"
      );
    });

    it("should disable sign up button", () => {
      expect(wrapper.find("button").element.disabled).toBeTruthy();
    });
  });

  describe("when repeat password input is different from password input", () => {
    const userData = {
      name: "User Name",
      email: "user@email.com",
      password: "pass",
      repeatPassword: "pass-diff",
    };

    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    beforeEach(async () => {
      await wrapper.setData({
        user: userData,
      });

      wrapper.vm.$v.user.repeatPassword.$touch();

      await wrapper.vm.$nextTick();
    });

    it("should show error message", () => {
      expect(
        wrapper.find(".test-repeat-password").props().hasError
      ).toBeTruthy();
      expect(
        wrapper.find(".test-repeat-password").props().errorMessage
      ).toEqual("Passwords must be identical");
    });

    it("should disable sign up button", () => {
      expect(wrapper.find("button").element.disabled).toBeTruthy();
    });
  });

  describe("when already exists user with email", () => {
    const userData = {
      name: "User Name",
      email: "user@email.com",
      password: "pass",
      repeatPassword: "pass",
    };

    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    beforeEach(async () => {
      authService.signUp.mockRejectedValue({ response: { status: 409 } });

      await wrapper.setData({
        user: userData,
      });

      await wrapper.find("button").trigger("click");
    });

    it("should show server error message", () => {
      expect(wrapper.find(".server-error-message").text()).toEqual(
        "Email already registered"
      );
    });
  });

  describe("when happens unexpected error on server", () => {
    const userData = {
      name: "User Name",
      email: "user@email.com",
      password: "pass",
      repeatPassword: "pass",
    };

    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    beforeEach(async () => {
      authService.signUp.mockRejectedValue({ response: { status: 500 } });

      await wrapper.setData({
        user: userData,
      });

      await wrapper.find("button").trigger("click");
    });

    it("should show server error message", () => {
      expect(wrapper.find(".server-error-message").text()).toEqual(
        "Something unexpected happened. Please try again"
      );
    });
  });
});
