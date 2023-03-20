import { AfterContentInit, Component } from '@angular/core';
import Parallax from 'parallax-js';

declare var Parallax: any;

@Component({
  selector: 'app-logo-parallax',
  templateUrl: './logo-parallax.component.html',
  styleUrls: ['./logo-parallax.component.css']
})
export class LogoParallaxComponent implements AfterContentInit{
  ngAfterContentInit() {
    const text = document.getElementById('text');
    const parallaxInstance = new Parallax(text, {
      relativeInput: true
    });
    // const scene = document.getElementById('scene');
    // const parallaxInstance1 = new Parallax(scene, {
    //   relativeInput: true
    // });
  }
}
