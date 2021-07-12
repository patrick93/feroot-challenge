import { shallowMount } from "@vue/test-utils";
import userService from "../../src/services/user.service";
import Welcome from "../../src/views/Welcome.vue";

jest.mock("../../src/services/user.service");

describe("welcome page", () => {
  describe("when successfully renders page", () => {
    const userData = {
      name: "User Name",
      email: "user@email.com",
    };

    userService.getUserInfo.mockReset();
    userService.getUserInfo.mockResolvedValue(userData);

    const wrapper = shallowMount(Welcome);

    it("should render welcome message", () => {
      expect(wrapper.find(".welcome h3").text()).toMatch(
        `Welcome ${userData.name}!`
      );
      expect(wrapper.find(".welcome h3").text()).toMatch(
        `You're logged in`
      );
    });

    it("should render logout button", () => {
      expect(wrapper.find("button").exists()).toBeTruthy();
      expect(wrapper.find("button").text()).toEqual("Logout");
    });
  });

  describe("when server error happens", () => {
    userService.getUserInfo.mockReset();
    userService.getUserInfo.mockRejectedValue({ response: { status: 500 } });

    const wrapper = shallowMount(Welcome);

    it("should render error message", () => {
      expect(wrapper.find(".test-error-message").text()).toEqual(
        "Something unexpected happened. Try refresh the page"
      );
    });

    it("should not render logout button", () => {
      expect(wrapper.find("button").exists()).toBeFalsy();
    });
  });
});
