## Members

<dl>
<dt><a href="#Layout">Layout</a> ⇒ <code><a href="#Layout">Layout</a></code></dt>
<dd><p>Layout - Function to create a Layout object</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Tile">Tile(x, y, w, h)</a> ⇒ <code><a href="#Tile">Tile</a></code></dt>
<dd><p>var Tile - A rectangle as the building block of layout operations.</p>
</dd>
</dl>

<a name="Layout"></a>

## Layout ⇒ [<code>Layout</code>](#Layout)
Layout - Function to create a Layout object

**Kind**: global variable  
**Returns**: [<code>Layout</code>](#Layout) - the Layout object  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | An array of objects to manage. Each object will have callbacks (as delegate functions) that will be called for diffent tasks |
| canvas | <code>Object</code> | The canvas (not the elemen type 'canvas'), where the Layout is held. Usually a sized div in the dom. |
| offset | <code>offset</code> | x, y position (as object), where the Layout is drawn. Defaults to rectangle position of the canvas. |

<a name="Tile"></a>

## Tile(x, y, w, h) ⇒ [<code>Tile</code>](#Tile)
var Tile - A rectangle as the building block of layout operations.

**Kind**: global function  
**Returns**: [<code>Tile</code>](#Tile) - the rectangle (the tile)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | position of the rectangle relative to the container |
| y | <code>Number</code> | position of the rectangle relative to the container |
| w | <code>Number</code> | width of the rectangle |
| h | <code>Number</code> | height of the rectangle |

