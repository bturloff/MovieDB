import React from "react";
import ReactDOM from "react-dom";
import { App } from "../containers/App";
import Adapter from "enzyme-adapter-react-16";
import mock from "./mock.json";

import Enzyme, { shallow } from "enzyme";
import MovieCards from "../components/MovieCards";
import SearchForm from "../components/SearchForm";
import NavBar from "../components/NavBar";
import Error from "../components/Error";

Enzyme.configure({ adapter: new Adapter() });

test("App renders without crashing", () => {
  shallow(<App />);
});

/**
 * MovieCards
 * */
test("MovieCards renders without crashing", () => {
  shallow(<MovieCards movies={[]} />);
});
test("MovieCards renders correctly with movies array", () => {
  const onClick = jest.fn();
  const wrapper = shallow(<MovieCards movies={[]} onClick={onClick} />);
  expect(wrapper).toMatchSnapshot();
  wrapper.setProps({ movies: mock.movies });
  expect(wrapper).toMatchSnapshot();
  wrapper
    .find(".img-wrapper")
    .first()
    .simulate("click");
  expect(onClick.mock.calls.length).toBe(1);
});

/**
 * SearchForm
 */
test("Search renders", () => {
  const onSubmit = jest.fn();
  const onChange = jest.fn();
  const value = "hello you";
  const wrapper = shallow(
    <SearchForm onSubmit={onSubmit} onChange={onChange} value={value} />
  );

  /** verify input value */
  const inputWrapper = wrapper.find("input").first();
  expect(inputWrapper.props().value).toEqual("hello you");

  /** verify onChange execution upon updating form */
  inputWrapper.simulate("change");
  expect(onChange).toBeCalled();

  /** verify submit button execution */
  wrapper
    .find(".search-button")
    .first()
    .simulate("click");
  expect(onSubmit).toBeCalled();
});

/**
 * NavBar
 */
test("Navbar should match snapshot", () => {
  const wrapper = shallow(<NavBar />);
  expect(wrapper).toMatchSnapshot();
});

/**
 * Error
 */
test("Error should render correctly", () => {
  const wrapper = shallow(
    <Error title="Important Error" body="come back later" />
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.contains("Important Error")).toBeTruthy();
});
