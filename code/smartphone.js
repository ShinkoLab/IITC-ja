window.isSmartphone = function() {
  // this check is also used in main.js. Note it should not detect
  // tablets because their display is large enough to use the desktop
  // version.

  // The stock intel site allows forcing mobile/full sites with a vp=m or vp=f
  // parameter - let's support the same. (stock only allows this for some
  // browsers - e.g. android phone/tablet. let's allow it for all, but
  // no promises it'll work right)
  var viewParam = getURLParam('vp');
  if (viewParam == 'm') return true;
  if (viewParam == 'f') return false;

  return navigator.userAgent.match(/Android.*Mobile/);
};

window.smartphone = function() {};

window.runOnSmartphonesBeforeBoot = function() {
  if(!isSmartphone()) return;
  console.warn('running smartphone pre boot stuff');

  // add smartphone stylesheet
  headHTML = document.getElementsByTagName('head')[0].innerHTML;
  headHTML += '<style>body {\n  color: #fff;\n}\n\n#updatestatus {\n  background: #262c32;\n  width: 100%;\n  color: #d4d5d6;\n  border: 0;\n  padding: 0;\n}\n\n#updatestatus .map {\n  margin-left: 4px;\n}\n\n#innerstatus {\n  padding: 4px;\n  float: right;\n  width: 50%;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n#loadlevel {\n  border-width: 0;\n  background: transparent;\n  color: #FFF;\n}\n\n#mobileinfo {\n  float: left;\n  width: 50%;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  position:relative;\n  padding: 4px 0;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n#mobileinfo .portallevel {\n  padding: 0 0.25em;\n  color: #FFF;\n}\n\n#mobileinfo .resonator {\n  position: absolute;\n  width: 12%; /* a little less that 1/8 to have a small distance */\n  height: 100%;\n  top: 0;\n  border-top: 3px solid red;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n}\n\n#mobileinfo .resonator.north:before {\n  content: "";\n  background-color: red;\n  border-radius: 100%;\n  display: block;\n  height: 6px;\n  width: 6px;\n  left: 50%;\n  top: -3px; \n  margin-left: -3px;\n  position: absolute;\n  z-index: -1;\n}\n\n#mobileinfo .filllevel {\n  position: absolute;\n  bottom: 0;\n  height: 3px;\n}\n\n#mobileinfo .enl .filllevel {\n  background-color: #03fe03 !important;\n}\n\n#mobileinfo .res .filllevel {\n  background-color: #00c5ff !important;\n}\n\n#name #signout { /* no hover, always show signout button */\n  display: block;\n}\n\n#sidebar, #chatcontrols, #chat, #chatinput {\n  background: transparent !important;\n}\n\n.leaflet-top .leaflet-control {\n  margin-top: 5px !important;\n  margin-left: 5px !important;\n}\n\n#searchwrapper {\n  font-size: 1.2em;\n}\n#searchwrapper .ui-accordion-header {\n  padding: 0.3em 0;\n}\n#searchwrapper li {\n  line-height: 1.3em;\n}\n\n#chatcontrols {\n  height: 38px;\n  width: 100%;\n  display: none !important;\n}\n\n/* hide shrink button */\n#chatcontrols a:first-child {\n  display: none;\n}\n\n#chatcontrols a {\n  width: 50px;\n  height:36px;\n  overflow: hidden;\n  vertical-align: middle;\n  line-height: 36px;\n  text-decoration: none;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n#chat {\n  left:0;\n  right:0;\n  top: 1px !important;\n  bottom:30px;\n  width: auto;\n}\n\n#chatinput {\n  width: 100%;\n  height: 30px;\n}\n\n#chat td:nth-child(2), #chatinput td:nth-child(2) {\n  width: 77px;\n}\n\n#chatcontrols a.active {\n  border-color: #FFCE00;\n  border-bottom-width:0px;\n  font-weight:bold\n}\n\n#chatcontrols a.active + a {\n  border-left-color: #FFCE00\n}\n\n#sidebartoggle {\n  display: none !important;\n}\n\n#scrollwrapper {\n  bottom: 0;\n  max-height: none !important;\n  width: 100% !important;\n  right: 0;\n  left:0;\n}\n\n#sidebar {\n  width: 100% !important;\n  min-height: 100%;\n  border:0;\n}\n\n#sidebar > * {\n  width: 100%;\n}\n\n#playerstat {\n  margin-top: 5px;\n}\n\n#portaldetails {\n  min-height: 0;\n}\n\n.fullimg {\n  width: 100%;\n}\n\n/*\n * for some reason leaflet popups on mobile are colored white on white\n * so force the popup msg color to black\n */\n.leaflet-popup-content{\n    color:black;\n}\n\n\n/* add extra padding, and a button effect, to sidebar link areas */\n.linkdetails aside  {\n  padding: 5px;\n  margin-top: 3px;\n  margin-bottom: 3px;\n  border: 2px outset #20A8B1;\n}\n\n#toolbox > a {\n  padding: 5px;\n  margin-top: 3px;\n  margin-bottom: 3px;\n  border: 2px outset #20A8B1;\n}\n\n#portaldetails .close {\n  padding: 4px;\n  border: 1px outset #20A8B1;\n  margin-top: 2px;\n}\n</style>';
  document.getElementsByTagName('head')[0].innerHTML = headHTML;

  // don’t need many of those
  window.setupStyles = function() {
    $('head').append('<style>' +
      [ '#largepreview.enl img { border:2px solid '+COLORS[TEAM_ENL]+'; } ',
        '#largepreview.res img { border:2px solid '+COLORS[TEAM_RES]+'; } ',
        '#largepreview.none img { border:2px solid '+COLORS[TEAM_NONE]+'; } '].join("\n") +
        '</style>');
  };

  window.smartphone.mapButton = $('<a>map</a>').click(function() {
    $('#map').css('visibility', 'visible');
    $('#updatestatus').show();
    $('#chatcontrols a .active').removeClass('active');
    $("#chatcontrols a:contains('map')").addClass('active');
  });

  window.smartphone.sideButton = $('<a>info</a>').click(function() {
    $('#scrollwrapper').show();
    $('.active').removeClass('active');
    $("#chatcontrols a:contains('info')").addClass('active');
  });

  $('#chatcontrols').append(smartphone.mapButton).append(smartphone.sideButton);

  window.addHook('portalDetailsUpdated', function(data) {
    var x = $('.imgpreview img').removeClass('hide');

    if(!x.length) {
      $('.fullimg').remove();
      return;
    }

    if($('.fullimg').length) {
      $('.fullimg').replaceWith(x.addClass('fullimg'));
    } else {
      x.addClass('fullimg').appendTo('#sidebar');
    }
  });
};

window.smartphoneInfo = function(data) {
  var guid = data.selectedPortalGuid;
  var t;
  if(!window.portals[guid]) return;

  data = window.portals[selectedPortal].options.data;
  var details = window.portalDetail.get(guid);

  var lvl = data.level;
  if(data.team === "NEUTRAL")
    t = '<span class="portallevel">L0</span>';
  else
    t = '<span class="portallevel" style="background: '+COLORS_LVL[lvl]+';">L' + lvl + '</span>';

  var percentage = data.health;
  if(details) {
    var totalEnergy = getTotalPortalEnergy(details);
    if(getTotalPortalEnergy(details) > 0) {
      percentage = Math.floor(getCurrentPortalEnergy(details) / totalEnergy * 100);
    }
  }
  t += ' ' + percentage + '% ';
  t += data.title;

  if(details) {
    var l,v,max,perc;
    var eastAnticlockwiseToNorthClockwise = [2,1,0,7,6,5,4,3];
    var slot,reso;

    for(var ind=0;ind<8;ind++)
    {
      if (details.resonators.length == 8) {
        slot = eastAnticlockwiseToNorthClockwise[ind];
        reso = details.resonators[slot];
      } else {
        slot = null;
        reso = ind < details.resonators.length ? details.resonators[ind] : null;
      }

      var className = TEAM_TO_CSS[getTeam(details)];
      if(slot !== null && OCTANTS[slot] === 'N')
        className += ' north';
      if(reso) {
        l = parseInt(reso.level);
        v = parseInt(reso.energy);
        max = RESO_NRG[l];
        perc = v/max*100;
      } else {
        l = 0;
        v = 0;
        max = 0;
        perc = 0;
      }

      t += '<div class="resonator '+className+'" style="border-top-color: '+COLORS_LVL[l]+';left: '+(100*ind/8.0)+'%;">';
      t += '<div class="filllevel" style="width:'+perc+'%;"></div>';
      t += '</div>';
    }
  }

  $('#mobileinfo').html(t);
};

window.runOnSmartphonesAfterBoot = function() {
  if(!isSmartphone()) return;
  console.warn('running smartphone post boot stuff');

  window.show('map');

  // add a div/hook for updating mobile info
  $('#updatestatus').prepend('<div id="mobileinfo" onclick="show(\'info\')"></div>');
  window.addHook('portalSelected', window.smartphoneInfo);
  // init msg of status bar. hint for the user that a tap leads to the info screen
  $('#mobileinfo').html('<div style="text-align: center"><b>ここをタップして詳細へ</b></div>');

  // disable img full view
  $('#portaldetails').off('click', '**');

  // make buttons in action bar flexible
  var l = $('#chatcontrols a:visible');
  l.css('width', 100/l.length + '%');

  // notify android that a select spinner is enabled.
  // this disables javascript injection on android side.
  // if android is not notified, the spinner closes on the next JS call
  if (typeof android !== 'undefined' && android && android.spinnerEnabled) {
    $("body").on("click", "select", function() {
      android.spinnerEnabled(true);
    });
  }

  // add event to portals that allows long press to switch to sidebar
  window.addHook('portalAdded', function(data) {
    data.portal.on('add', function() {
      if(!this._container || this.options.addedTapHoldHandler) return;
      this.options.addedTapHoldHandler = true;
      var guid = this.options.guid;

      // this is a hack, accessing Leaflet’s private _container is evil
      $(this._container).on('taphold', function() {
        window.renderPortalDetails(guid);
        window.show('info');
      });
    });
  });

  if(typeof android !== 'undefined' && android && android.setPermalink) {
    window.map.on('moveend', window.setAndroidPermalink);
    addHook('portalSelected', window.setAndroidPermalink);
  }


  // for some reason, leaflet misses the WebView size being set at startup on IITC Mobile
  // create a short timer that checks for this issue
  setTimeout (function() { map.invalidateSize(); }, 0.2*1000);

};



window.setAndroidPermalink = function() {
  var c = window.map.getCenter();
  var lat = Math.round(c.lat*1E6)/1E6;
  var lng = Math.round(c.lng*1E6)/1E6;

  var href = '/intel?ll='+lat+','+lng+'&z=' + map.getZoom();

  if(window.selectedPortal && window.portals[window.selectedPortal]) {
    var p = window.portals[window.selectedPortal].getLatLng();
    lat = Math.round(p.lat*1E6)/1E6;
    lng = Math.round(p.lng*1E6)/1E6;
    href += '&pll='+lat+','+lng;
  }

  href = $('<a>').prop('href',  href).prop('href'); // to get absolute URI
  android.setPermalink(href);
};

window.useAndroidPanes = function() {
  // isSmartphone is important to disable panes in desktop mode
  return (typeof android !== 'undefined' && android && android.addPane && window.isSmartphone());
};

if(typeof android !== 'undefined' && android && android.getFileRequestUrlPrefix) {
  window.requestFile = function(callback) {
    do {
      var funcName = "onFileSelected" + parseInt(Math.random()*0xFFFF).toString(16);
    } while(window.funcName !== undefined);

    window.funcName = function(filename, content) {
      callback(decodeURIComponent(filename), atob(content));
    };
    var script = document.createElement('script');
    script.src = android.getFileRequestUrlPrefix() + funcName;
    (document.body || document.head || document.documentElement).appendChild(script);
  };
}
