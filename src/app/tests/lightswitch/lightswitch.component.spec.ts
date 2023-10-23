import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementComponent } from 'src/app/chemistry/common-components/element/element.component';
import { HighlightByTemperatureService } from 'src/app/service/highlight-by-temperature.service';
import { HighlightStateService } from 'src/app/service/highlight-state.service';
import { HighlightTypeService } from 'src/app/service/highlight-type.service';

import { LightswitchComponent } from './lightswitch.component';

// describe('LightswitchComponent', () => {
//   let component: LightswitchComponent;
//   let fixture: ComponentFixture<LightswitchComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ LightswitchComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(LightswitchComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


describe('LightswitchComp', () => {

  let component: LightswitchComponent;
  let fixture: ComponentFixture<LightswitchComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LightswitchComponent],
      providers: [
        HighlightStateService,
        HighlightTypeService,
        HighlightByTemperatureService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LightswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#clicked() should toggle #isOn', () => {
    const comp = new LightswitchComponent();

    expect(comp.isOn)
      .withContext('off at first')
      .toBe(false);

    comp.clicked();

    expect(comp.isOn)
      .withContext('on after click')
      .toBe(true);

    comp.clicked();

    expect(comp.isOn)
      .withContext('off after second click')
      .toBe(false);

  });

  it('#clicked() should set #message to "is on"', () => {
    const comp = new LightswitchComponent();
    console.log('comp.message :', comp.message);

    expect(comp.message)
      .withContext('off at first')
      .toMatch(/is off/i);
    comp.clicked();
    expect(comp.message)
      .withContext('on after clicked')
      .toMatch(/is on/i);
  });

  it('dummy 1 = 1', () => {
    expect(1).toBe(1);
  });

  describe('testing Melting boiling points of ElementComponent', () => {
    const hss = new HighlightStateService();
    const hts = new HighlightTypeService();
    const hbts = new HighlightByTemperatureService();

    let ec = new ElementComponent(hss, hts, hbts);
    const chemical =
    {
      "name": "Oganesson",
      "boil": 350, "melt": null,
      "phase": "Solid",
      "xpos":1, "ypos":1
    };

    let res = ec.isMelted(chemical, 350);
    it('melt element with null melting point at 270', () => {
      expect(res).withContext('must be').toBe(false);     
    });

  });
});