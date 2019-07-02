import React, { useState } from 'react'
import { Item } from '../../lib/classicdb/item'
import TooltipTrigger from 'react-popper-tooltip';
import { TooltipArg, ChildrenArg } from 'react-popper-tooltip/dist/types'
import './tooltip.css'

export const Tooltip = ({
    children,
    tooltip,
    hideArrow,
    ...props
}: any) => (
        <TooltipTrigger
            {...props}
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
