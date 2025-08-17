// Toggle for the "Market" submenu in the header

document.addEventListener('DOMContentLoaded', function () {
  const btn  = document.querySelector('button[aria-controls="cd-submenu-market"]');
  const menu = document.getElementById('cd-submenu-market');
  if (!btn || !menu) return;

  function openMenu() {
    btn.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
  }
  function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  }

  // toggle on click
  btn.addEventListener('click', function () {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // close when clicking outside
  document.addEventListener('click', function (e) {
    const host = btn.closest('.cd-nav__item--has-submenu');
    if (host && !host.contains(e.target)) closeMenu();
  });

  // close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
});


// Canvas chart setup
const ctx = document.getElementById('cryptoChart').getContext('2d');


const generateData = (points = 24) => {
  const now = new Date();
  const data = [];
  for(let i = points; i >= 0; i--) {
    data.push({
      x: new Date(now.getTime() - i * 60 * 60 * 1000), 
      y: Math.floor(Math.random() * 50000) + 10000
    });
  }
  return data;
};


let cryptoChart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: 'Crypto Value',
      data: generateData(),
      borderColor: '#daf012ff',
      backgroundColor: 'transparent',
      tension: 0.3,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          tooltipFormat: 'MMM d, HH:mm'
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value ($)'
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
});

//------------------------------------------------
const buttons = document.querySelectorAll('.cd-duration-item');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    let range = btn.getAttribute('data-range');
    let points;

    switch(range) {
      case '1h': points = 1; break;
      case '8h': points = 8; break;
      case '1d': points = 24; break;
      case '1w': points = 24*7; break;
      case '1m': points = 24*30; break;
      case '6m': points = 24*30*6; break;
      case '1y': points = 24*365; break;
      default: points = 24;
    }

    cryptoChart.data.datasets[0].data = generateData(points);
    cryptoChart.update();
  });
});

//------------------------------------------------

