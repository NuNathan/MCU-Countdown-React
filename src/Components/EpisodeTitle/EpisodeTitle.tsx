import { FormControl, makeStyles, withStyles, Select } from '@material-ui/core';
import React from 'react';
import { ICookieFormat } from '../../Helpers/interfaces';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    styledSelect: {
        root: {
            color: "#eceaeb",
            fontFamily: "Bebas Neue, cursive",
            'transform:scaleY': 1.3,
            fontSize: "40px",
            textShadow: "0px 3px 1px rgba(225,0,0,0.8)",
            padding: "0px",
            lineHeight: "60px",
        }
    }
}));

const StyledSelect = withStyles({
    root: {
        color: "#eceaeb",
        fontFamily: "Bebas Neue, cursive",
        'transform:scaleY': 1.3,
        fontSize: "40px",
        textShadow: "0px 3px 1px rgba(225,0,0,0.8)",
        padding: "0px",
        lineHeight: "60px",
    }
})(Select);



const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 54*5
      },
    },
  };


interface IEpisodeTitle {
    text: string;
    callBackEpisode: any;
    data: {
        display_value: string;
        card_image:string;
        premiere: string;
    }[];
}

const EpisodeTitle = ({ text, callBackEpisode, data }: IEpisodeTitle) => {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <StyledSelect
                    className="episodeTitle"
                    defaultValue=""
                    value={text}
                    onChange={callBackEpisode}
                    MenuProps={MenuProps}
                    inputProps={{
                        name: 'episode'
                    }}

                >
                    {
                    data.map((element: ICookieFormat, index: number) => (
                        <option key={"episodeTitleIndex-"+index} 
                            value={element.display_value} 
                            style={{ backgroundColor: "black" }} 
                            className="episodeTitle">
                                {element.display_value}
                        </option>
                    ))}
                </StyledSelect>
            </FormControl>
        </div>
    )
}

export default EpisodeTitle;
