import {Component, OnInit} from '@angular/core';
import {Visitor} from '../../model/visitor';
import {VisitorService} from '../../service/visitor.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  visitors: Visitor[];

  constructor(private visitorService: VisitorService) {
  }

  ngOnInit() {
    this.getVisitors();
  }

  getVisitors(): void {
    this.visitorService.getVisitors()
      .subscribe(visitors => this.visitors = visitors);
  }

}
