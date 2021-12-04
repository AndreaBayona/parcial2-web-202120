import React from 'react';
import { LOCALES } from '../i18n/locales';
import {Dropdown} from "react-bootstrap";
import { FormattedMessage, useIntl } from 'react-intl';

export const I18nSelect = (props) => {
  const {setLanguage} = props;
  const {locale} = useIntl();

  return (
      <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
              {locale === LOCALES.SPANISH ? <FormattedMessage id="spanish"/> : <FormattedMessage id="english"/>}
          </Dropdown.Toggle>
          <Dropdown.Menu>
              <Dropdown.Item onClick={() => setLanguage(LOCALES.SPANISH)}><FormattedMessage id="spanish"/></Dropdown.Item>
              <Dropdown.Item onClick={() => setLanguage(LOCALES.ENGLISH)}><FormattedMessage id="english"/></Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
  );
};
