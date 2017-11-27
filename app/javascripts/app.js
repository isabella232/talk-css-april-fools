let Talk = {
  $slides: null,
  init() {
    Reveal.initialize({
      width: 1368,
      height: 768,
      margin: 0,
      minScale: .8,
      maxScale: 2,

      controls: false,
      progress: true,
      history: true,
      center: true,
      transition: 'fade',

      dependencies: [{
        src: 'js/vendors/classList.js',
        condition: () => {
          return !document.body.classList;
        }
      }, {
        src: 'js/vendors/prism.js',
        callback: () => {
          Prism.highlightAll();
        }
      }]
    });

    Talk.$slides = $('.slides').first();

    // Resizing slides to fit the whole screen
    Reveal.addEventListener('ready', Talk.onSlideChange);
    Reveal.addEventListener('slidechanged', Talk.onSlideChange);
    $(window).on('resize', _.throttle(() => {
      Talk.forceFullScreen('section.present');
    }, 500));

    Talk.customScripts();
  },
  onSlideChange(event) {
    Talk.setGlobalStateClasses();
    Talk.forceFullScreen(event.currentSlide);
    if (event.previousSlide) {
      Talk.forceFullScreen(event.previousSlide);
    }
  },
  // Cancel Reveal positioning of slides
  forceFullScreen(slide) {
    $(slide).css('top', 0);
  },
  // We set a global "state" to the whole deck, based on the current slide
  // layout
  setGlobalStateClasses() {
    var currentSlide = document.querySelector('section.present');
    let currentStateClasses = Talk.$slides.attr('class').split(' ');
    let currentSlideClasses = _.filter(currentSlide.classList, className => {
      return _.startsWith(className, 'slide--');
    });
    let newStateClasses = _.concat(
      _.reject(currentStateClasses, className => {
        return _.startsWith(className, 'layout--')
      }),
      _.map(currentSlideClasses, className => {
        return className.replace('slide--', 'layout--')
      })
    );
    Talk.$slides.attr('class', newStateClasses.join(' '));
  },
  customScripts() {
    Talk.demoDynamicValue();
    Talk.demoSeveralResults();
  },
  // Simulate the typing of the correct value in the input
  demoDynamicValue() {
    let input = $('#demo-dynamic-value-input');
    let valueNode = $('#demo-dynamic-value-value');
    let nomatch = $('#demo-dynamic-value-nomatch');
    let match = $('#demo-dynamic-value-match');

    input.on('input', (event) => {
      let value = $(event.target).val();
      valueNode.html(`"${value}"`)
      if (value=="tim") {
        nomatch.hide();
        match.show();
      } else {
        nomatch.show();
        match.hide();
      }
    });
  },
  demoSeveralResults() {
    let input = $('#demo-several-results-input');
    let match = $('.demo-several-results-match');
    let toRemove = "o-80 bg-ghost bunting";
    let toAdd = "bg-gradient-blue titan-white"

    input.on('input', (event) => {
      let value = $(event.target).val();
      if (value=="alexandre") {
        match.removeClass(toRemove).addClass(toAdd)
      } else {
        match.addClass(toRemove).removeClass(toAdd)
      }
    });
  },
}
export default Talk;
