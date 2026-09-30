import LandingPageComponent from './components/landing-page-component.js?v=20260930-t11';
import AboutPageComponent from './components/about-page-component.js?v=20260930-t11';
import NavbarComponent from './components/navbar-component.js?v=20260930-t11';
import CollectionPageComponent from './components/collection-page-component.js?v=20260930-t11';
import ItemDetailPageComponent from './components/item-detail-page-component.js?v=20260930-t11';
import AuthPageComponent from './components/auth-page-component.js?v=20260930-t11';
import RegisteredEventsPageComponent from './components/registered-events-page-component.js?v=20260930-t12';

const routes = [
  {
    path: '/',
    component: LandingPageComponent,
  },
  {
    path: '/about',
    component: AboutPageComponent,
  },
  {
    path: '/items',
    component: CollectionPageComponent,
  },
  {
    path: '/items/:id',
    component: ItemDetailPageComponent,
  },
  {
    path: '/login',
    component: AuthPageComponent,
    props: { mode: 'login' },
  },
  {
    path: '/signup',
    component: AuthPageComponent,
    props: { mode: 'signup' },
  },
  {
    path: '/registered-events',
    component: RegisteredEventsPageComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  setup() {
    const itemsStore = Vue.reactive({
      items: [],
      isLoading: true,
      error: '',
    });

    const registrationStore = Vue.reactive({
      isLoggedIn: true,
      registeredItemIds: ['autumn-classics-meet', 'coastal-cruise-in'],
      notice: {
        type: '',
        message: '',
      },
    });

    fetch('items-template.csv?v=20260930-t11')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load CSV data file.');
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data, errors }) => {
            if (errors.length > 0) {
              itemsStore.error = 'There was a problem reading the CSV data.';
              itemsStore.items = [];
            } else {
              itemsStore.items = data.map((row) => {
                const title = String(row.title || row.name || '').trim();
                const image = String(row.image || row.image_url || '').trim();

                return {
                  id: String(row.id || '').trim(),
                  title,
                  date: String(row.date || '').trim(),
                  time: String(row.time || '').trim(),
                  location: String(row.location || '').trim(),
                  description: String(row.description || '').trim(),
                  image,
                  category: String(row.category || '').trim(),
                  name: title,
                  imageUrl: image,
                };
              });
              itemsStore.error = '';
            }
            itemsStore.isLoading = false;
          },
          error: () => {
            itemsStore.error = 'There was a problem parsing CSV data.';
            itemsStore.items = [];
            itemsStore.isLoading = false;
          },
        });
      })
      .catch(() => {
        itemsStore.error = 'There was a problem loading data.';
        itemsStore.items = [];
        itemsStore.isLoading = false;
      });

    Vue.provide('itemsStore', itemsStore);
    Vue.provide('registrationStore', registrationStore);

    return {};
  },
});

app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
