Advanced Angular 18
---------------------------------------------------

    Objectives
    ---------------------------------------------------

        1. Advanced concepts of Angular 18.
            
            Standalone Components
            Signals
            @defer
            Change Detection Modes
            Dependency Injection
            Content Projection
            RxJS and Observables
            NgRx for State Management
            Dynamic Components            

        2. Upgradation concepts (New Builder Package)
        3. Form Events
        4. Router and Redirects
        5. Server side rendering Enhancements(Deprecation of HttpClientModule) - Angular Universal

    Standalone Components

        Stadnalone components, standalone Directives, standalone pipes are all those
        that do not belong a module.

    Angular Built In Flow Controls

        Flow Controls are provided as an enhanced alternate to structural directives

        @if

            @if( cond ) {

            } @else if ( cond2 )  {

            } @else {

            }

        @for

            @for( loopingVar of array; track uniqueValue ; let i = $index ) {

            } @empty {
                
            }

            $index, $count, $first, $last, $even, $odd

        @switch

            @switch( expr ){
                @case ( val1 ) {
                    
                }
                @case ( val2 ) {
                    
                }
                @default {
                    
                }
            }

    Angular Signals

        a signal is a primitive reactive unit.

        a signal encapsulates a piece of data, and each time the value gets changed, all fo its
        dependencies or subscribers are updated.

        ReadWrite Signals

            x = signal(0)

            x()                     //the data is read

            x.update( x() + 1 );    //the data is written

        Computed Signals or readOnly Signals

            xSquare = computed( () => Math.power(x(),2) )

    Angular State Management using NgRx

        Store           is a central object that holds all the data related to the application.
                        generally one appliction will have only one store.                      

        Reducer         is the one that manages the data/state in the store. Any initialization / insertion / deletion /
                        modification tot he state in the store is doen by the reducer.

        Selector        is the one that extracts state from the store into a component.

        Action          is an object that represents an operation dispatched by a component and to be handled by the reducer.

        Effect          is an adapter to execute asynchronous logic liek api-calls and signal the reducer

            Store   -----SELECTOR -------Component1
                ↑                           |
                |                           |
                |                           |
                |                           |
                |                           ACTION
                |                           ↓
            REDUCER ←-----------------------|
                ↑                           ↓
                EFFECTS ←--------------------
                |
                |
            SERVICE (rest-api calls)

        ng add @ngrx/store@18.0.0
        ng add @ngrx/effects@18.0.0
    
    Angular State Management using NgRx Signal Store

        ng add @ngrx/signals

        Ngrx Signals offers NgRx store with native signals support, that
        makes managing state globally more simple and reactive.

        export const StoreName = signalStore(
            {providedIn:'root'},
            withState(/* initialState "/),
            withComputed(/* computed proeprties */),            
            withMethods((store, apiService = inject(APIService)) => ({
                //define methods to execute api calls from apiService
            }))
        );

        withState       is used to provided initial data into the store
                        each field/property of the inital data is going to be a Signal.

        withComputed    is used to provide computed signals as fields to the store                    
                        it accepts a callback having current-state as param and that callBack msut return a json object of computed signals.

        withMethods     is used top add methods (actions) to the store

                interface ArthStoreType {
                    x: number;
                    y: number;
                }     

                const initialData : ArthStoreType = { x:0, y:0 };

                export const ArthStore = signalStore(
                    {providedIn:'root'},
                    withState(initialData),
                    withComputed(({x,y}) => ({
                        sum: computed( () => x() + y() ),
                        dif: computed( () => x() - y() ),
                        prd: computed( () => x() * y() )
                    })),            
                    withMethods((store) => ({
                        changeX(x){
                            patchState(store,{x})
                        },
                        changeY(y){
                            patchState(store,{y})
                        },
                    }))
                );

                /*                            
                ArthStore.x()   is a signal<number>
                ArthStore.y()   is another signal<number>
                ArthStore.sum() is a computed signal<number>
                ArthStore.dif() is a computed signal<number>
                ArthStore.prd() is a computed signal<number>
                ArthStore.changeX(10);
                ArthStore.changeY(50);
                */

    Angular App Performence Enhancers

        1. Zoneless Change Detection and Change Detection Strategies / Modes

                Zone.js is the library used by Angular NgZone module to perform change detection.

                    The change Detection happens at a scheduled interval of time by NgZone from
                    top to bottom on the component tree in depth-first-search pattern.

                        app.component
                            |
                            ----------------
                            |              |
                            Component1     Component2
                                |
                                Component1ChildComponent

                    Zone.js offers two modes of Change Detection or two strategies of chagne detection
                        (a) Default                        
                        (b) OnPush

                    In 'Default' stratagy each and every component is checked for chagnes in the field of the component, and
                    as and when a chagne is detected the entire hirarchy of components from that detected component will be re-rendred.

                    We can skip a component from being checked for chagnes continouly, by marking its changeDetection:'OnPsuh'.
                        These components are verified for cahgnes only when kit is marked as 'dirty'.
                        A component is marked 'dorty' when
                            (1) any input-bound fields change
                            (2) ChangeDetectionRef.markForCheck() is invoked
                            (3) any state change happend on the ViewChildren
                            (4) Any chagnes happen to the ContnetChildren

                Zone.js is a overhead on the application bundle and also keeps the dubuging stack trace filled with
                change detection calls.

                And here ZoneLess Change Detection comes into picture. Angular 18 has introduced an experimental 
                chagne detection strategy called zone-less-change-detection.

                In this case, the scheduling of continous change detection will not happen. Rather each component has a 
                nativly designed ChangeDetector that signals the Rendering engine every time a change happens to the state
                of the component. We do not need Zone.js anymore.

                To activate zone-less-change-detection, in app.config.ts,
                    replace
                        provideZoneChangeDetection({ eventCoalescing: true })
                    with
                        provideExperimentalZonelessChangeDetection()

        2. Defered Loading

            Allows to load a time-consuming component lately.

            ComponentA  is the parent of ComponentB.

            component-a.template.html

                <app-component-b></app-component-b>

            If ComponentB is a huge component with lots of heavy javascript to execute, it delays the rendering of ComponentA as well.

            ComponentB can be loaded lately to avoid the delay of ComponentA using @defer block
                
            component-a.template.html
                <div> this will be rendered</div>
                @defer {
                    <!-- this will be rendered only when the browser is idle -->
                    <app-component-b></app-component-b>
                }
                <div> this will be rendered</div>

            All the template of ComponentA will be loaded but not ComponentB until 'browser is idle'.

            Placeholder block

                component-a.template.html
                    <div> this will be rendered</div>
                    @defer {
                        <!-- this will be rendered only when the browser is idle -->
                        <app-component-b></app-component-b>
                    } @placeholder {
                        <div> this will be rendered alogn with the rest of the tempalte and disapperas once the defer block loads </div>
                    }
                    <div> this will be rendered</div>
            
            Placeholder block with minimum display time

                component-a.template.html
                    <div> this will be rendered</div>
                    @defer {
                        <!-- this will be rendered only when the browser is idle -->
                        <app-component-b></app-component-b>
                    } @placeholder(minimum 300ms) {
                        <div> this will be rendered along with the rest of the tempalte and disapperas once the defer block loads </div>
                    }
                    <div> this will be rendered</div>

            Loading Block
                component-a.template.html
                    <div> this will be rendered</div>
                    @defer {
                        <!-- this will be rendered only when the browser is idle -->
                        <app-component-b></app-component-b>
                    } @loading {
                        <div> 
                            this will be rendered once the defered block starts 
                            loading and disappears after the defered block
                            completes loading 
                        </div>
                    } @placeholder {
                        <div> this will be rendered alogn with the rest of the tempalte and disapperas once the defer block loads </div>
                    }
                    <div> this will be rendered</div>

            Error Block
                component-a.template.html
                    <div> this will be rendered</div>
                    @defer {
                        <!-- this will be rendered only when the browser is idle -->
                        <app-component-b></app-component-b>
                    } @error {
                        <div> 
                            this will be rendered if ComponentB could not be loaded or encounters an error.
                        </div>
                    } @loading {
                        <div> 
                            this will be rendered once the defered block starts 
                            loading and disappears after the defered block
                            completes loading 
                        </div>
                    } @placeholder {
                        <div> this will be rendered alogn with the rest of the tempalte and disapperas once the defer block loads </div>
                    }
                    <div> this will be rendered</div>

            Defered Block Triggers

                triggers will decide when shall the loading of the defer start.

                @defer(on idle){
                    <!-- the defered block to load only when the browser is idle, adn this is the default-->
                    <huge-component></huge-component>
                }

                @defer(on immediate){
                    <!-- the defered block to load immidiately after the rendering all non-defered content-->
                    <huge-component></huge-component>
                }

                @defer(on viewport){
                    <!-- the defered block to load after the placeholder block is scrolled into-->
                    <huge-component></huge-component>
                }
                
                @defer(on interaction){
                    <!-- the defered block to load after the placeholder block is clicked-->
                    <huge-component></huge-component>
                }
                
                @defer(on hover){
                    <!-- the defered block to load after the placeholder block is hovered-->
                    <huge-component></huge-component>
                }

                @defer(on timer(timeInMilliSecs)){
                    <!-- the defered block to load after the mentioned delay time-->
                    <huge-component></huge-component>
                }

                @defer(when condition){
                    <!-- the defered block to load once the condition is true for the first-->
                    <huge-component></huge-component>
                }

    Dynamic Component Loading

        dynamic component loading is to load a component into its parent's template
        on the fly or at runtime. NgComponentOutlet directive to facilitate dynamic 
        component loading.

        parent.template.html

            <ng-container *ngComponentOutlet="componentRef">
            </ng-container>

            <button (click)="toggle()">Toggle</button>

        parent.component.ts

            @Component({
                /*all the required meta-properties*/
            })
            export class ParentComponent{
                componentRef:Type<any>; //Type from @angular/core is the base type of any component
                index:number=0;
                childComponents:Type>any>[];

                constructor(){
                    this.childComponents = [
                        FirstChildComponent,
                        SecondChildComponent,
                        ThridChildComponent
                    ];
                }

                toggle(){
                    this.componentRef = this.childComponents[this.index];
                    this.index++;
                    if(index===this.childComponents.length){
                        this.index=0;
                    }
                }
            }

    Server Side Rendering and Server Side Generation (SSR and SSG)

        Angular 18 offers hybrid content management.

        Client Side Generation / Client Side Rendering
            The html content can be generated dynamically on the client

        Server Side Generation
            The html content is generated at the build time as static html files
            and are loaded on to the client providing improve start-time and load-time
            of the application. This also enhances SEO.

        Server Side Rendering
            The html content is generated on the server at the run time and is provided
            to the client. This offers support for users having low network band-width and
            also enhances SEO.

        When we work with component that follow SSR / SSG, we have to remember that objects like window/ document ...etc., are available.

        Similarly, components that render on the client can not have access to file-system or request or response objects unlike components that render on server side.

        Hydration
            is a technique introduced in angualr to ensure duplicate generation of DOM is not happening.

        Scenarios to decide on the mode of generation

            NavBarComponent     assuming is a component that offers navigation links.
                                and these links may change while user logins or logout.
                                This is a component best suited for SSR.

            MessageBoxComponent assuming is a component that has to display messages dynamically.
                                This is a component best suited for client side rendering

            HomeComponent       assuming is a component that has a brand logo and a login form.
                                this is a componetn best suited for SSG.

        While creating a new app, SSR and SSG can be enabled on the project wizrd.

        To enable ssr and ssg on an existing app,
            
            ng add @angular/ssr

        app-root
            |-server.ts                     nodJs based expressjs application server
            |-src
                |-main.server.ts            server bootstraping
                |-app
                    |-app.config.server.ts  server side config.s
                    |-app.routes.server.ts  declare server side routes

        to enable hydration in app.config.ts,   provideClientHydration()

        to define the rendering mode of a path, in app.routes.server.ts

            export const serverRoutes: ServerRoute[] = [
                { path: "ssr", renderMode: RenderMode.Server },
                { path: "ssg", renderMode: RenderMode.Prerender },
                { path: "csr", renderMode: RenderMode.Client },
            ];

        and , in app.routes.ts

            export const routes: Route[] = [
                { path: "ssr", component:Component1 },
                { path: "ssg", component:Component2 },
                { path: "csr", component:Component3 },
            ];

        and, in app.config.server.ts    provideServerRoutesConfig(serverRoutes)
        and, in app.config.ts   provideRouter(routes)