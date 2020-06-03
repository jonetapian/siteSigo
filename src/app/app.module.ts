import { EditarProdutoComponent } from './shared/editar-produto/editar-produto.component';
import { PromocoesService } from './paginas/promocoes/service/promocoes.service';
import { TagService } from './paginas/tags/service/tag.service';
import { LoginService } from './paginas/login/service/login.service';
import { UsuarioService } from './usuario/usuario.service';
import { CadastroService } from './paginas/cadastro/service/cadastro.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule} from '@angular/fire/storage';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { LoginComponent } from './paginas/login/login.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { CamisetasComponent } from './paginas/camisetas/camisetas.component';
import { ShortsComponent } from './paginas/shorts/shorts.component';
import { TenisComponent } from './paginas/tenis/tenis.component';
import { ContatoComponent } from './paginas/contato/contato.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { AdicionarProdutoComponent } from './paginas/adicionar-produto/adicionar-produto.component';
import { DropzoneDirective } from './dropzone/dropzone.directive';
import { UploadTaskComponent } from './shared/upload-task/upload-task.component';
import { CarrinhoComponent } from './paginas/carrinho/carrinho.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormAlertComponent } from './shared/form-alert/form-alert.component';
import { BuyCardComponent } from './shared/buy-card/buy-card.component';
import { TagsComponent } from './paginas/tags/tags.component';
import { FinalizarCompraComponent } from './paginas/finalizar-compra/finalizar-compra.component';

import { PromocoesComponent } from './paginas/promocoes/promocoes.component';
import { ShowComponentComponent } from './shared/show-product-component/show-component.component';
import { DestaquesComponent } from './paginas/destaques/destaques/destaques.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { WhiteDividerComponent } from './shared/white-divider/white-divider.component';
import { FilterComponent } from './shared/filter/filter.component';
import { SelectedFilterComponent } from './shared/filter/selected-filter/selected-filter.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CampoControlErroComponent } from './shared/campo-control-erro/campo-control-erro.component';
import { CalcularFreteComponent } from './shared/calcular-frete/calcular-frete.component';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { ViewProductComponent } from './paginas/view-product/view-product.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {LayoutModule} from '@angular/cdk/layout';
import { PagseguroComponent } from './paginas/pagseguro/pagseguro.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import { CarrinhoCardComponent } from './paginas/carrinho/carrinho-card/carrinho-card.component';
import { LancamentosComponent } from './paginas/lançamentos/lancamentos/lancamentos.component';
import { PesquisarComponent } from './shared/pesquisar/pesquisar.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    CamisetasComponent,
    ShortsComponent,
    TenisComponent,
    ContatoComponent,
    MenuComponent,
    AdicionarProdutoComponent,
    DropzoneDirective,
    CarrinhoComponent,
    FormAlertComponent,
    BuyCardComponent,
    TagsComponent,
    FinalizarCompraComponent,
    PromocoesComponent,
    ShowComponentComponent,
    DestaquesComponent,
    CarouselComponent,
    WhiteDividerComponent,
    FilterComponent,
    SelectedFilterComponent,
    NavBarComponent,
    CampoControlErroComponent,
    CalcularFreteComponent,
    ViewProductComponent,
    PagseguroComponent,
    CarrinhoCardComponent,
    EditarProdutoComponent,
    LancamentosComponent,
    UploadTaskComponent,
    LancamentosComponent,
    PesquisarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatFabMenuModule,
    MatExpansionModule,
    LayoutModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule

  ],
  providers: [CadastroService,UsuarioService,LoginService,TagService,PromocoesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
