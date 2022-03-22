import { Component, Input, OnInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart(obj: any) {
    try {
      // var data = google.visualization.arrayToDataTable([
      //   ["Element", "Density", { role: "style" } ],
      //   ["Copper", 8.94, "#3178c6"],
      //   ["Silver", 10.49, "#3178c6"],
      //   ["Gold", 19.30, "#3178c6"],
      //   ["Platinum", 21.45, "color: #3178c6"]
      // ]);
      let data = google.visualization.arrayToDataTable(obj);
      let view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);

      let options = {
        title: "Daily energy consumptionDensity",
        width: 900,
        height: 600,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
      };
      let chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
    } catch (err) {

    }
  }
} 
