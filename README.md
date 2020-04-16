# Bar Chart

> **Note:** WIP. Experimenting with making React and D3 work well together.

It's a little tricky to make React and D3 work together because they both want to manipulate the DOM. There are probably a few strategies for making this work, but my goal here was to allow each to do what it does best, i.e. let React take care of the user interactions and state management, and let D3 do all the data visualization (not just the math).

What this small [contrived] React/D3 example web application does is, render a bar chart for 2 separate sets of data (tallest men in the world, and tallest women in the world). Which dataset D3 uses is determined by the `gender` selected by the user. React handles the user's gender selection, tells D3 what that selection is and gives D3 an svg to draw on.

I don't think I fully achieved the goal of letting React do what it's best at because I made it not rerender the wrapper Chart component when its `gender` prop changes. Why? Because the wrapper Chart componenet (which wraps the actual D3 chart) just renders the svg that D3 will draw on and nothing about that svg needs changing when the `gender` prop changes. In fact, D3 relies on it not going away. If React rerenders the svg (replaces the current one with a new one), then the smooth D3 transitions from one bar chart to the other won't work as intended. Instead the current bar chart will just go away, and the new one appear, which is a bit jarring compared to having the bar charts transition from one to the other over time.

The above description will likely be clearer by observing the web app in action and then inspecting the code.

## Instructions

In one terminal, run the web app:

1. git clone git@github.com:randie/rb-react-d3-barchart.git
2. cd rb-react-d3-barchart
3. yarn
4. yarn start

In a separate terminal, run the mock API server:

1. cd rb-react-d3-barchart
2. yarn db
