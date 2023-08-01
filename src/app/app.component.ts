import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cat-test';

  ngOnInit(): void {
    localStorage.setItem('apiKey','live_tLXjzghttVqZA3vVhZ72M2lkYlkUbiQ6VEun7VlLmS0oc0L8tgAuXI2Jja3QwjiZ')
  }
}
