import React, {useState} from "react";
import { observer, inject } from "mobx-react";
import { Page, Navbar, List, ListItem, BlockTitle } from "framework7-react";
import { useTranslation } from "react-i18next";

const PagePresentationSettings = props => {
    const { t } = useTranslation();
    const _t = t("View.Settings", { returnObjects: true });
    const store = props.storePresentationSettings;
    const slideSizeArr = store.getSlideSizes;
    const slideSize = store.slideSize;
    const slideSizeValue = store.slideSizeValue;
    console.log(slideSize);
  
    return (
        <Page>
            <Navbar title={_t.textPresentationSettings} backLink={_t.textBack} />

            <BlockTitle>{_t.textSlideSize}</BlockTitle>
            <List>
                <ListItem radio name="slide-size" value="0" checked={slideSizeValue === 0} 
                    onChange={(e) => {
                        props.onSlideSize(slideSizeArr[e.target.value]);
                        store.changeSlideFormat(e.target.value);
                    }} title={_t.mniSlideStandard}></ListItem>
                <ListItem radio name="slide-size" value="1" checked={slideSizeValue === 1} 
                    onChange={(e) => {
                        props.onSlideSize(slideSizeArr[e.target.value]);
                        store.changeSlideFormat(e.target.value);
                    }} title={_t.mniSlideWide}></ListItem>
            </List>
        
            <List mediaList>
                <ListItem title={_t.textColorSchemes} link="/color-schemes/" routeProps={{
                    onColorSchemeChange: props.onColorSchemeChange,
                    initPageColorSchemes: props.initPageColorSchemes
                }}></ListItem>
            </List>
        </Page>
    )
}

const PagePresentationColorSchemes = props => {
    const { t } = useTranslation();
    const curScheme = props.initPageColorSchemes();
    const [stateScheme, setScheme] = useState(curScheme);
    const _t = t('View.Settings', {returnObjects: true});
    const store = props.storePresentationSettings;
    const allSchemes = store.allSchemes;

    return (
        <Page>
            <Navbar title={_t.textColorSchemes} backLink={_t.textBack} />
            <List>
                {
                    allSchemes ? allSchemes.map((scheme, index) => {
                        return (
                            <ListItem radio={true} className="color-schemes-menu" key={index} title={scheme.get_name()} checked={stateScheme === index} 
                                onChange={() => {
                                    if(index !== curScheme) {
                                        setScheme(index);
                                        props.onColorSchemeChange(index);
                                    };
                            }}>
                                <div slot="before-title">
                                    <span className="color-schema-block">
                                        {
                                            scheme.get_colors().map((elem, index) => {
                                                if(index >=2 && index < 7) {
                                                    let clr = {background: "#" + Common.Utils.ThemeColor.getHexColor(elem.get_r(), elem.get_g(), elem.get_b())};
                                                    return (
                                                        <span className="color" key={index} style={clr}></span>
                                                    )
                                                }
                                            })
                                        }
                                       
                                    </span>
                                </div>
                            </ListItem>
                        )
                    }) : null        
                }
            </List>
        </Page>

    )
};

const PresentationSettings = inject("storePresentationSettings")(observer(PagePresentationSettings));
const PresentationColorSchemes = inject("storePresentationSettings")(observer(PagePresentationColorSchemes));

export { PresentationSettings, PresentationColorSchemes }