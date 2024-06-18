import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "../../services/data.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'blog-item-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [DataService],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.css'
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = '';
  public text: string = '';
  public title: string = '';

  constructor(private service: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let id: string = '';
    this.route.paramMap
      .subscribe((params: any) => {
        id = params.get('id');
        console.log("ID: "+id)
      });

    this.service.getById(id).subscribe((res: any) => {
      const post = res;
      this.title = post['title'];
      this.image = post['image'];
      this.text = post['text'];
    });
  }
}
