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
        6. Improved I18n support.

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

            
    