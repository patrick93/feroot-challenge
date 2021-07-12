import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Vuelidate from "vuelidate";
import SignIn from "../../src/views/SignIn.vue";

import authService from "../../src/services/auth.service";

jest.mock("../../src/services/auth.service");

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe("sign in page", () => {
  describe("when renders the component", () => {
    const wrapper = shallowMount(SignIn, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    it("should render header", () => {
      expect(wrapper.find("h3").text()).toEqual("Please Sign In");
    });

    it("should not render message of user registered", () => {
      expect(wrapper.find("test-user-registered-message").exists()).toBeFalsy();
    });

    it("should render email input", () => {
      expect(wrapper.find(".test-email").exists()).toBeTruthy();
    });

    it("should render password input", () => {
      expect(wrapper.find(".test-password").exists()).toBeTruthy();
    });

    it("should render sign in button", () => {
      const buttonEl = wrapper.find("button");
      expect(buttonEl.exists()).toBeTruthy();
      expect(buttonEl.text()).toEqual("Sign In");
    });

    it("should render footer", () => {
      expect(wrapper.find(".test-footer span").text()).toEqual(
        "Does not have an account?"
      );
    });

    it("should render link that redirect to sign in", () => {
      expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
        name: "sign-up",
      });
      expect(wrapper.findComponent(RouterLinkStub).text()).toEqual(
        "Create new one"
      );
    });
  });

  describe("when renders the component after redirect of successfully registered an user", () => {
    const wrapper = shallowMount(SignIn, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $route: {
          params: {
            userRegisteredSuccessfully: true,
          },
        },
      },
    });

    it("should render header", () => {
      expect(wrapper.find("h3").text()).toEqual("Please Sign In");
    });

    it("should render message of user registered", () => {
      expect(wrapper.find(".test-user-registered-message").text()).toEqual(
        "User successfully registered. Just sign in."
      );
    });

    it("should render email input", () => {
      expect(wrapper.find(".test-email").exists()).toBeTruthy();
    });

    it("should render password input", () => {
      expect(wrapper.find(".test-password").exists()).toBeTruthy();
    });

    it("should render sign in button", () => {
      const buttonEl = wrapper.find("button");
      expect(buttonEl.exists()).toBeTruthy();
      expect(buttonEl.text()).toEqual("Sign In");
    });

    it("should render footer", () => {
      expect(wrapper.find(".test-footer span").text()).toEqual(
        "Does not have an account?"
      );
    });

    it("should render link that redirect to sign in", () => {
      expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
        name: "sign-up",
      });
    });
  });

  describe("when click on sign in button with valid input", () => {
    const userCredentialsData = {
      email: "user@email.com",
      password: "pass",
    };

    const router = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(SignIn, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $router: router,
        $route: {
          params: {},
        },
      },
    });

    beforeEach(async () => {
      authService.signIn = jest.fn();

      await wrapper.setData({
        userCredentials: userCredentialsData,
      });

      await wrapper.find("button").trigger("click");
    });

    it("should call sign in on authService", () => {
      expect(authService.signIn).toHaveBeenCalledWith(userCredentialsData);
    });

    it("should redirect to welcome page", () => {
      expect(router.push).toHaveBeenCalledWith({
        name: "welcome",
      });
    });
  });

  describe("when email input is empty", () => {
    const userData = {
      email: "",
      password: "pass",
    };

    const wrapper = shallowMount(SignIn, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    beforeEach(async () => {
      await wrapper.setData({
        userCredentials: userData,
      });

      wrapper.vm.$v.userCredentials.email.$touch();

      await wrapper.vm.$nextTick();
    });

    it("should show error message", () => {
      expect(wrapper.find(".test-email").props().hasError).toBeTruthy();
      expect(wrapper.find(".test-email").props().errorMessage).toEqual(
        "Invalid email"
      );
    });

    it("should disable sign in button", () => {
      expect(wrapper.find("button").element.disabled).toBeTruthy();
    });
  });

  describe("when email input is invalid", () => {
    const userData = {
      email: "email",
      password: "pass",
    };

    const wrapper = shallowMount(SignIn, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    beforeEach(async () => {
      await wrapper.setData({
        userCredentials: userData,
      });

      wrapper.vm.$v.userCredentials.email.$touch();

      await wrapper.vm.$nextTick();
    });

    it("should show error message", () => {
      expect(wrapper.find(".test-email").props().hasError).toBeTruthy();
      expect(wrapper.find(".test-email").props().errorMessage).toEqual(
        "Invalid email"
      );
    });

    it("should disable sign in button", () => {
      expect(wrapper.find("button").element.disabled).toBeTruthy();
    });
  });

  describe("when user submit invalid credential", () => {
    const userData = {
      email: "user@email.com",
      password: "pass",
    };

    const wrapper = shallowMount(SignIn, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    beforeEach(async () => {
      authService.signIn.mockRejectedValue({ response: { status: 400 } });

      await wrapper.setData({
        userCredentials: userData,
      });

      await wrapper.find("button").trigger("click");
    });

    it("should show server error message", () => {
      expect(wrapper.find(".server-error-message").text()).toEqual(
        "Invalid email or password"
      );
    });
  });

  describe("when happens unexpected error on server", () => {
    const userData = {
      email: "user@email.com",
      password: "pass",
    };

    const wrapper = shallowMount(SignIn, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    beforeEach(async () => {
      authService.signIn.mockRejectedValue({ response: { status: 500 } });

      await wrapper.setData({
        userCredentials: userData,
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
