import * as React from 'react';

import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Primitive } from '@radix-ui/react-primitive';

//import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { RiSkipDownLine } from '@remixicon/react';

type ExpendCollapseToggleButtonElement = React.ElementRef<typeof Primitive.button>;

type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button> & VariantProps<typeof expendCollapseToggleButtonVariants>;

interface ExpendCollapseToggleButtonProps extends PrimitiveButtonProps {
	/**
	 * The controlled state of the expended.
	 */
	expended?: boolean;
	/**
	 * The state of the ExpendCollapseToggleButton when initially rendered. Use `defaultExpended`
	 * if you do not need to control the state of the expended.
	 * @defaultValue false
	 */
	defaultExpended?: boolean;
	/**
	 * The callback that fires when the state of the expended changes.
	 */
	onExpendedChange?(expended: boolean): void;
}

const expendCollapseToggleButtonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'p-2',
				sm: 'rounded-md p-1',
				lg: 'rounded-md p-4',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'ghost',
			size: 'default',
		},
	}
);

const ExpendCollapseToggleButton = React.forwardRef<ExpendCollapseToggleButtonElement, ExpendCollapseToggleButtonProps>((props, forwardedRef) => {
	const { expended: pressedProp, defaultExpended = false, onExpendedChange, variant, size, className, children, ...buttonProps } = props;

	const [expended = false, setExpended] = useControllableState({
		prop: pressedProp,
		onChange: onExpendedChange,
		defaultProp: defaultExpended,
	});

	const mergedChildren: React.ReactNode = children ? (
		children
	) : (
		<>
			<RiSkipDownLine className={cn('transition-all', expended ? 'rotate-180' : '')} />
			<span>{expended ? 'Collapse' : 'Expend'}</span>
		</>
	);

	return (
		<Primitive.button
			type="button"
			aria-pressed={expended}
			area-label={expended ? 'expended' : 'collapsed'}
			data-state={expended ? 'expended' : 'collapsed'}
			data-disabled={props.disabled ? '' : undefined}
			{...buttonProps}
			ref={forwardedRef}
			className={cn(!children && 'w-[8rem]', expendCollapseToggleButtonVariants({ variant, size, className }))}
			onClick={composeEventHandlers(props.onClick, () => {
				if (!props.disabled) {
					setExpended(!expended);
				}
			})}
		>
			{mergedChildren}
		</Primitive.button>
	);
});

ExpendCollapseToggleButton.displayName = 'ExpendCollapseToggleButton';
export { ExpendCollapseToggleButton, expendCollapseToggleButtonVariants, type ExpendCollapseToggleButtonProps };
