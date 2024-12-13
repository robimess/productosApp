import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  //====MOCK PARA SERVICIOS====
  const mockFirebaseService = {
    signOut: jasmine.createSpy('signOut')
  }
  const mockUtilsService = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: UtilsService, useValue: mockUtilsService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('deberia llamar la funcion signOut "cerrar sesion" desde FirebaseService', () => {
    component.signOut();
    expect(mockFirebaseService.signOut).toHaveBeenCalled();
  });
});
