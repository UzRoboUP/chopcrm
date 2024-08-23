import React from 'react'
import ContentHeader from '../../ui/ContentHeader'

export default function CreateCompany() {
  return (
    <div className="content">
    <div className="content__header">
      <ContentHeader
        pagename="Создать компанию"
        hasPhone={true}
      />
    </div>
    <div className="content__report"></div>
    <div className="content__main">
      <div className="content__cards">
        <div className="content__row">
           .......
        </div>
      </div>
    </div>
  </div>
  )
}
