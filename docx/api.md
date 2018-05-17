### A general view on charts
2-dimensional charts can visualize up to 3 values and a potentially unlimited number of categories.

_Note: a value series is an array of real numbers, dense and non-enumerable, whereas a category is a set of enumerable items, i.e. they can be mapped 1:1 to integers._

One example of a complex chart would be:
- Value 1 on a horizontal axis
- Value 2 on a vertical axis
- Value 3 as a measure of the radius of the data point's symbol  (usually a circle, but could be a symbol thats sizes scale with the radius of a circle a that point)
- Category 1..N color code for a data point (explained by a legend)
- Category N+1 as animated selector (most reasonable for time like categories, e.g. month or year)

Real life example: Let's say we have a data set from a user survey that contains data records of the following type:

`{score: 20, salary: 100, gender: male, retention: 20, month: 3}`

We want to draw a portfolio chart, which looks like this:
- dimension _employee satisfaction score_ (value 1): horizontal value axis
- dimension _employee salary_ (value 2): vertical value axis
- dimension _number of survey returns_ (value 3): radius of a data point
- dimension _gender_ (categories 'male', 'female'): color coded
- dimension _survey month_ (categories 'jan', 'feb', ...): animated filter

In addition, we can also present a potentially unlimited series of categories and up to 3 value series.
An example for this would be:
- Values 1 on horizontal axis
- Values 2 on vertival axis
- Values 3 on
This means that a general chart would be able to consume a more complex data series description.
 ### Requirements
 A chart library API should not force the user to remap data series for each and every chart. Instead a general chart template (or class) should
