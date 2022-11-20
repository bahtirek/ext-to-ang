import { Component, Input, OnInit } from '@angular/core';
import { Environment } from 'src/app/interfaces/environment.interface';
import { AccountService } from 'src/app/services/account.service';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-environment-search',
  templateUrl: './environment-search.component.html',
  styleUrls: ['./environment-search.component.less']
})
export class EnvironmentSearchComponent implements OnInit {

  constructor(private environmentService: EnvironmentService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.setEnvironment()
  }
  setEnvironment() {
    this.environment = this.environmentService.environment;
    if(this.environment && this.environment.name) {
      this.searchQuery = this.environment.name;
    }
  }

  @Input() validation: any = true;

  searchQuery: string = "";
  searchResults: Environment[] = [];
  timeout: any;
  environment: any;
  count: number = 0;


  onResultClick(environment: Environment){
    this.searchQuery = environment.name!;
    this.searchResults = [];
    this.environment = environment;
    this.count = 0;
    this.environmentService.environment = environment;
  }

  onSearch() {
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
        this.searchQuery = this.searchQuery.trim();
        if(this.searchQuery.length >= 2) {
            this.getEnvironments()
        } else {
            this.searchResults = []
        }
        this.environment = {};
    }, 100);
  }

  getEnvironments(){
    this.environmentService.getEnvironments(this.accountService.account, this.searchQuery).subscribe(data => {
      this.searchResults = data.result;
    })
  }
}
