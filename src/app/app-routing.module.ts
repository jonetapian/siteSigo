import { RastreioComponent } from './paginas/rastreio/rastreio.component';
import { DepoisDaCompraComponent } from './paginas/depois-da-compra/depois-da-compra/depois-da-compra.component';
import { VerCompraComponent } from './paginas/ver-compras/ver-compra/ver-compra.component';
import { ListaComprasComponent } from './paginas/ver-compras/lista-compras/lista-compras.component';
import { ConfiguracoesComponent } from './paginas/configuracoes/configuracoes.component';
import { EditarProdutoComponent } from './shared/editar-produto/editar-produto.component';
import { LancamentosComponent } from './paginas/lançamentos/lancamentos/lancamentos.component';
import { PagseguroComponent } from './paginas/pagseguro/pagseguro.component';
import { ViewProductComponent } from './paginas/view-product/view-product.component';
import { FinalizarCompraComponent } from './paginas/finalizar-compra/finalizar-compra.component';
import { DestaquesComponent } from './paginas/destaques/destaques/destaques.component';
import { PromocoesComponent } from './paginas/promocoes/promocoes.component';
import { TagsComponent } from './paginas/tags/tags.component';
import { CarrinhoComponent } from './paginas/carrinho/carrinho.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenisComponent } from './paginas/tenis/tenis.component';
import { ShortsComponent } from './paginas/shorts/shorts.component';
import { ContatoComponent } from './paginas/contato/contato.component';
import { CamisetasComponent } from './paginas/camisetas/camisetas.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { LoginComponent } from './paginas/login/login.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { AdicionarProdutoComponent } from './paginas/adicionar-produto/adicionar-produto.component';
import { PesquisarComponent } from './shared/pesquisar/pesquisar.component';
import { ToastComponent } from './shared/toast/toast.component';

const routes: Routes = [
  {path: 'cadastro', component: CadastroComponent},
  {path: 'camisetas', component: CamisetasComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'shorts', component: ShortsComponent},
  {path: 'tenis', component: TenisComponent},
  {path: 'adicionar-produto', component: AdicionarProdutoComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'tags', component: TagsComponent},
  {path: 'finalizar-compra', component: FinalizarCompraComponent},
  {path: 'promocoes', component: PromocoesComponent},
  {path: 'destaques', component: DestaquesComponent},
  {path: 'ver-produto/:key', component: ViewProductComponent},
  {path: 'pagseguro', component: PagseguroComponent},
  {path: 'lancamentos', component: LancamentosComponent},
  {path: 'editar-produto/:key', component: EditarProdutoComponent},
  {path: 'pesquisar', component: PesquisarComponent},
  {path: 'compras' , component: ListaComprasComponent},
  {path: 'compras/:key', component: VerCompraComponent},
  {path: 'compra_pag_seguro', component: DepoisDaCompraComponent},
  {path: 'toast', component: ToastComponent},
  {path: 'configuracoes', component: ConfiguracoesComponent},
  {path: 'rastreio', component: RastreioComponent},
  {path: '', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
