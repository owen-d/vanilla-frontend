import React from 'react'
import TooltipTrigger from 'react-popper-tooltip';
import './tooltip.css'
import { noop } from '../../lib/util/noop'

export const Tooltip = ({
    children,
    tooltip,
    hideArrow,
    onVisibilityChange,
    ...props
}: any) => (
        <TooltipTrigger
            {...props}
            onVisibilityChange={onVisibilityChange || noop}
            tooltip={({
                arrowRef,
                tooltipRef,
                getArrowProps,
                getTooltipProps,
                placement
            }) => (
                    <div
                        {...getTooltipProps({
                            ref: tooltipRef,
                            className: 'tooltip-container'
                        })}
                    >
                        {!hideArrow && (
                            <div
                                {...getArrowProps({
                                    ref: arrowRef,
                                    className: 'tooltip-arrow',
                                    'data-placement': placement
                                })}
                            />
                        )}
                        {tooltip}
                    </div>
                )}
        >
            {({ getTriggerProps, triggerRef }) => (
                <span
                    {...getTriggerProps({
                        ref: triggerRef,
                        className: 'trigger'
                    })}
                >
                    {children}
                </span>
            )}
        </TooltipTrigger>
    );
