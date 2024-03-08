import React, { useRef, useEffect } from 'react';

import {
  Chart, BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { tailwindConfig, formatThousands } from '../utils/Utils';

Chart.register(BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend);

function BarChart04({
  order,
  completed,
  width,
  height
}) {

  const canvas = useRef(null);
  const legend = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          `${order.aufnr}`
        ],
        datasets: [
          // Blue bars
          {
            label: `Planeado: ${order.qtdpl}`,
            data: [
              `${order.qtdpl}`
            ],
            backgroundColor: tailwindConfig().theme.colors.blue[500],
            hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
            categoryPercentage: 0.66,
          },
          // Light blue bars
          {
            label: `Apuntado: ${order.qtdpr}`,
            data: [
              `${order.qtdpr}`
            ],
            backgroundColor: '#FFA500',
            hoverBackgroundColor: '#FFA500',
            categoryPercentage: 0.66,
          },
          {
            label: `Realizado: ${completed}`,
            data: [
              `${completed}`,
            ],
            backgroundColor: '#009B4A',
            hoverBackgroundColor: '#009B4A',
            categoryPercentage: 0.66,
          },
        ],
      },
      redraw: true,
      options: {
        indexAxis: 'y',
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {  
            grid: {
              display: true,
              drawBorder: false,
            },
            ticks: {
              display: false,
              font: {
                size: 12,
                letterSpacing: 2,
                lineHeight: 2
              }
            }
          },
          x: {
            grid: {
              drawBorder: false,
            },
            ticks: {
              maxTicksLimit: 4,
              align: 'end',
              callback: (value) => formatThousands(value),
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => formatThousands(context.parsed.x),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
        id: 'htmlLegend',
        afterUpdate(c, args, options) {
          const ul = legend.current
          if (!ul) return
          // Remove old legend items
          while (ul.firstChild) {
            ul.firstChild.remove()
          }
          // Reuse the built-in legendItems generator
          const items = c.options.plugins.legend.labels.generateLabels(c)
          items.forEach((item) => {
            const li = document.createElement('li')
            li.style.marginRight = tailwindConfig().theme.margin[4]
            // Button element
            const button = document.createElement('button')
            button.style.display = 'inline-flex'
            button.style.alignItems = 'center'
            button.style.opacity = item.hidden ? '.3' : ''
            button.onclick = () => {
              c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex))
              c.update()
            }
            // Color box
            const box = document.createElement('span')
            box.style.display = 'block'
            box.style.width = tailwindConfig().theme.width[3]
            box.style.height = tailwindConfig().theme.height[3]
            box.style.borderRadius = tailwindConfig().theme.borderRadius.full
            box.style.marginRight = tailwindConfig().theme.margin[2]
            box.style.borderWidth = '3px'
            box.style.borderColor = item.fillStyle
            box.style.pointerEvents = 'none'
            // Label
            const label = document.createElement('span')
            label.style.color = tailwindConfig().theme.colors.slate[500]
            label.style.fontSize = '18px'
            label.style.lineHeight = 1.2
            const labelText = document.createTextNode(item.text)
            label.appendChild(labelText)
            li.appendChild(button)
            button.appendChild(box)
            button.appendChild(label)
            ul.appendChild(li)
          })
        },
      }],
    });
    return () => chart.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, completed]);

  return (
    <React.Fragment>
      <div className="px-5 py-4">
        <ul ref={legend} className="flex flex-wrap"></ul>
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default BarChart04;
