# Ejercicios de React

## Tic Tac Toe (Tutorial)

### What Is React?
React is a **declarative, efficient, and flexible JavaScript library** for building user interfaces. It lets you **compose complex UIs from small and isolated pieces of code** called “components”.

React has a few different kinds of components, but we’ll start with `React.Component` **subclasses**:

We use components to tell React **what we want to see on the screen**. When our data changes, React will efficiently update and re-render our components.

A component takes in parameters, called `props` (short for “properties”), and returns a **hierarchy of views to display** via the `render` method.

The **render method** returns a description of what you want to see on the screen. React takes the description and displays the result. In particular, **render returns a React element**, which is a lightweight description of what to render.

Most React developers use a special syntax called “JSX” which makes these structures easier to write. The <div /> syntax is transformed at build time to `React.createElement('div')`.

JSX comes with the full power of JavaScript. You can put any JavaScript expressions within braces inside JSX. **Each React element is a JavaScript object that you can store in a variable** or pass around in your program.

The ShoppingList component above only renders built-in DOM components like `<div />` and `<li />`. But you can compose and render custom React components too. Each React component is encapsulated and can operate independently; this allows you to build complex UIs from simple components.

### Inspecting the Starter Code
By inspecting the code, you’ll notice that we have three **React components**:
1. Square: The Square component renders a single <button>
2. Board: The Board renders 9 squares
3. Game: The Game component renders a board with placeholder values

### Passing Data Through Props
Let’s try **passing some data from our Board component to our Square component**. In Board’s `renderSquare` method, change the code to pass a prop called `value` to the Square:

    return <Square value={i} />;

Change Square’s render method to show that value by replacing `{/* TODO * /}` with `{this.props.value}`:

    <button className="square">
        {this.props.value}
     </button>

You’ve just “passed a prop” from a parent Board component to a child Square component. **Passing props** is how **information flows** in React apps, **from parents to children**.

### Making an Interactive Component
Let’s **fill the Square component with an “X” when we click it**. First, change the button tag that is returned from the Square component’s `render()` function to this:

      <button className="square" onClick={function() { alert('click'); }}>
        {this.props.value}
      </button>

To save typing and avoid the confusing behavior of this, we will use the **arrow function syntax for event handlers**.

      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>

As a next step, we want the **Square component to “remember” that it got clicked**, and fill it with an “X” mark. To “remember” things, components use **state**.

React components can have state by setting `this.state` in their **constructors**. `this.state` should be considered as private to a React component that it’s defined in. Let’s **store the current value** of the Square in `this.state`, and change it when the Square is clicked.

First, we’ll **add a constructor** to the class to **initialize** the state:

    class Square extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: null,
        };
      }

In JavaScript classes, you need to **always call** `super` **when defining the constructor of a subclass**. All React component classes that have a constructor should start it with a super(props) call.

Now we’ll **change the Square’s render method to display the current state’s value** when clicked:
- Replace `this.props.value` with `this.state.value` inside the <button> tag.
- Replace the `onClick={...}` event handler with `onClick={() => this.setState({value: 'X'})}`.
- Put the `className` and `onClick props` on separate lines for better readability.

After these changes, the <button> tag that is returned by the Square’s render method looks like this:

By calling `this.setState` from an `onClick` handler in the Square’s render method, we tell React to **re-render** that Square whenever its <button> is clicked. After the update, the Square’s `this.state.value` will be 'X', so we’ll see the X on the game board. If you click on any Square, an X should show up.

When you call `setState` in a component, React **automatically updates the child components inside of it too**.

## Proyecto "Hoteles"
