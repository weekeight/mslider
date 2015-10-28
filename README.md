# mslider

A very simple jQuery slider plugin for mobile

- surpport touch event
- autoplay
- fluid width
- bottom nav bar

## Usage

### basic html

```
  <div class="mslider J_MSlider">
    <ul>
      <li>
        <img src="http://dummyimage.com/400x300/000/fff" alt="">
      </li>
      <li>
        <img src="http://dummyimage.com/400x300/999/f00" alt="">
      </li>
      <li>
        <img src="http://dummyimage.com/400x300/222/0f0" alt="">
      </li>
    </ul>
  </div>
```

### basic css

```
.mslider *{
    margin: 0;
    padding: 0;
  }
  .mslider{
    position: relative;
    overflow: hidden;
  }
  .mslider li{
    float: left;
    list-style: none;
  }
  .mslider .dots{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    margin: 0;
  }
  .mslider .dots .dot{
    -webkit-filter: drop-shadow(0 1px 2px rgba(0,0,0,.3));
    -moz-filter: drop-shadow(0 1px 2px rgba(0,0,0,.3));
    -ms-filter: drop-shadow(0 1px 2px rgba(0,0,0,.3));
    -o-filter: drop-shadow(0 1px 2px rgba(0,0,0,.3));
    filter: drop-shadow(0 1px 2px rgba(0,0,0,.3));

    display: inline-block;
    width: 10px;
    height: 10px;
    overflow: hidden;
    margin: 0 4px;

    text-indent: -999em;

    border: 2px solid #fff;
    border-radius: 6px;
    -webkit-border-radius: 6px;

    cursor: pointer;
    opacity: .4;

    -webkit-transition: background .5s, opacity .5s;
    -moz-transition: background .5s, opacity .5s;
    transition: background .5s, opacity .5s;
  }
  .mslider .dots .dot.active{
    background: #fff;
    opacity: 1;
  }
```

### import js lib

```javascript
<script src="yourpath/jquery.js"></script>
<script src="yourpath/mslider.min.js"></script>
```

### initialize instance

```
<script>
$('.J_MSlider').MSlider();
<script>
```

## Initialized Options

- speed: 500 // ms, animation speed(integer)
- delay: 2000 // delay between slides(integer)
- dots : true // show dots pagination(boolean)
- items: '>ul'   // slides container selector
- item: '>li'    // slidable items selector
- easing: 'ease' // easing function to use for animation
- autoplay: true  // autoplay after initialisation
- touchmove: true // surpport touch event(boolean)

## Methods

- play() : start playing animation
- stop() : stop playing animation
- to(targetItemIndex): show corresponding item
- destroy() : destroy the mslider instance 
