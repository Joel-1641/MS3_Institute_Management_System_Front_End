import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ServiceComponent } from "./service/service.component";
import { AboutComponent } from "./about/about.component";
import { CoursesComponent } from "./courses/courses.component";
import { FunfactsComponent } from "./funfacts/funfacts.component";
import { TeamComponent } from './team/team.component';
import { TestimonalComponent } from "./testimonal/testimonal.component";
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from "./footer/footer.component";
import { EventsComponent } from './events/events.component';
import { HeaderComponent } from "./header/header.component";
import { TopBannerComponent } from './top-banner/top-banner.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ServiceComponent, AboutComponent, CoursesComponent, FunfactsComponent, TeamComponent, TestimonalComponent, ContactUsComponent, FooterComponent, EventsComponent, HeaderComponent, TopBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}



