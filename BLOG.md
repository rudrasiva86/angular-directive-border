> Feel free to skip the detailed steps and jump directly to the [stackblitz demo](#stackblitz-demo) at the end of the post 

Attribute Directives is one of the three types of directives in Angular. They are used to change the appearance and behavior of an element, component, or another directive. 

In this post, we will discuss only about changing the appearance of an element and leave the behaviour changing for the next post. As we progress through the steps below, we will introduce the Angulars features [@Directive](https://angular.io/api/core/Directive) and [@HostBinding](https://angular.io/api/core/HostBinding) to acheive this.

## Steps to be followed 
1. As a good practice, create a separate directory to place all your custom directives in your angular project. I have a created a new folder name `directives` under the `src/app` directory

    ![Create Directory](https://thepracticaldev.s3.amazonaws.com/i/tbx2k1rpwau8tk8wuxf6.png)

2. Create a new file `border.directive.ts` inside the `directives` directory

    ![Create File](https://thepracticaldev.s3.amazonaws.com/i/4v79dt3ia2932havia7z.png)

3. In the `border.directive.ts` file, create a usual typescript class just as below.

    ```typescript
    export class BorderDirective {
    }

    ```
4. To make this class as a attribute directive, we need to decorate it with `@Directive` annotation

    ```typescript
    @Directive()
    export class BorderDirective {  

    }
    ```

5. We must give this directive a name using the `selector` property just as we do for a [@Component](https://angular.io/api/core/Component). The name we give here will be used in the html files.

    ```typescript
    @Directive({
        selector: '[border]'
    })
    export class BorderDirective {

    }
    ```

6. In the above step, if you notice, we have surronded the name with `[]` because this directive will be an attribute directive. But in case of `@Component` we don't surround the selector with brackets because they will be used as tags `< >` in the html templates.

7. By this point, you might notice an error for `@Directive`. To fix that, add the import statement as the first line in the file.

    ```typescript
    import { Directive } from '@angular/core';
    ```

8. To use this new custom directive we have to declare it in our module `app.module.ts`.

    ```typescript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { FormsModule } from '@angular/forms';

    import { AppComponent } from './app.component';
    import { BorderDirective } from './directives/border.directive.ts';

    @NgModule({
        imports:      [ BrowserModule, FormsModule ],
        declarations: [ AppComponent, BorderDirective ],
        bootstrap:    [ AppComponent ]
    })
    export class AppModule { }
    ```

9. That's it! Our new custom directive is ready to be added to any DOM element or component. Let's add this to a `<div>` tag in our `app.component.html`

    ```html
    <div border>
        This is a simple div with 'border' attribute
    </div>
    ```

10. If you run the application, you won't see any border around the `div`. Because we didn't specify anything in our `border.directive.ts` when `border` attribute is found on a DOM element.

11. To do that, lets add the below snippet to our `BorderDirective` class in the `border.directive.ts` file
    ```typescript
    @HostBinding('style.borderStyle')
    get style() {
        return 'solid';
    }
    ```

12. `@HostBinding` decorator binds the property specified in the argument to the host DOM element. In the above snippet, we binded the border-style property to the host element.

13. You might notice an error for `@HostBinding`, to fix that add the required import.

    ```typescript
    import { Directive, HostBinding } from '@angular/core';
    ```

14. Now if you run the application, you will find a solid border around the div. Yay!!

    ![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/8cm6jcn5qlp6wjvebyyp.png)

15. But if you notice, we are not done yet. Because, the style is border is same and not configurable. So we must provide a way to the consumer(i.e., div or any DOM element) to provide the styles they want.

16. So let's add an input property in the `BorderDirective` class and update the style() method as below. If the consumer doesn't provide the bStyle attribute, then it will be defaulted to 'solid'. 

    ```typescript
    @Directive({
    selector: '[border]'
    })
    export class BorderDirective {
        @Input() bStyle: string = 'solid';
        
        @HostBinding('style.borderStyle')
        get style() {
            return this.bStyle;
        }
    }
    ```

17. Don't forget to add the import for `@Input`.

    ```typescript
    import { Directive, HostBinding, Input } from '@angular/core';
    ```

18. Now add another div to our html file as below and verify the output

    ```html
    <div border>
        This is just a div with border directive
    </div>

    <div border bStyle='dotted'>
        This is just a div with border directive and specifies the style using the bStyle property
    </div>
    ```
    ![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/ekvrwm5sx004r4n97evy.png)

19. Similarly we can add and customize various properties for the border. 
    ```typescript
    import { Directive, HostBinding, Input } from '@angular/core';

    @Directive({
    selector: '[border]'
    })
    export class BorderDirective {
        @Input() bStyle: string = 'solid';
        @Input() bRadius: number = 10;
        @Input() bPadding: number = 10;
        @Input() bMargin: number = 10;
        @Input() bColor: string = 'lightgrey';
        @Input() bWidth: number = 2;

        @HostBinding('style.borderStyle')
        get style() {
            return this.bStyle;
        }

        @HostBinding('style.borderRadius')
        get radius() {
            return `${this.bRadius}px`;
        }

        @HostBinding('style.padding')
        get padding() {
            return `${this.bPadding}px`;
        }

        @HostBinding('style.margin')
        get margin() {
            return `${this.bMargin}px`;
        }

        @HostBinding('style.borderColor')
        get color() {
            return this.bColor;
        }

        @HostBinding('style.borderWidth')
        get thickness() {
            return `${this.bWidth}px`;
        }
    }
    ```

## Stackblitz Demo <a name="stackblitz-demo"></a>

{% stackblitz angular-directive-border file=src/app/app.component.html %}
