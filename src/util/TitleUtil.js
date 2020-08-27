import React from 'react'

export const TitleUtil = ({title,explanation,...extraClasses}) => {

     
    return (
        <div className="text-center text-md-left mb-sm-0 col-xs-12 col-sm-12" {...extraClasses}>
            <h3 className="page-title">{title}</h3>
            <span className="text-uppercase page-subtitle">{explanation}</span>
        </div>
    )
};

export default TitleUtil;