import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoCadastroComponent } from './medico-cadastro.component';

describe('MedicoCadastroComponent', () => {
  let component: MedicoCadastroComponent;
  let fixture: ComponentFixture<MedicoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicoCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
