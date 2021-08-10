import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Divider,
    ListItem,
    ListItemText,
    ListItemIcon,
} from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import parse from "html-react-parser";

const counties = [
    { Code: "C", Name: "基隆市" },
    { Code: "A", Name: "臺北市" },
    { Code: "F", Name: "新北市" },
    { Code: "H", Name: "桃園市" },
    { Code: "O", Name: "新竹市" },
    { Code: "J", Name: "新竹縣" },
    { Code: "K", Name: "苗栗縣" },
    { Code: "B", Name: "臺中市" },
    { Code: "M", Name: "南投縣" },
    { Code: "N", Name: "彰化縣" },
    { Code: "P", Name: "雲林縣" },
    { Code: "I", Name: "嘉義市" },
    { Code: "Q", Name: "嘉義縣" },
    { Code: "D", Name: "臺南市" },
    { Code: "E", Name: "高雄市" },
    { Code: "T", Name: "屏東縣" },
    { Code: "G", Name: "宜蘭縣" },
    { Code: "U", Name: "花蓮縣" },
    { Code: "V", Name: "臺東縣" },
    { Code: "X", Name: "澎湖縣" },
    { Code: "W", Name: "金門縣" },
    { Code: "Z", Name: "連江縣" },
];

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        width: "100%",
        height: 400,
        backgroundColor: theme.palette.background.paper,
    },
}));
const Easymap = () => {
    const classes = useStyles();
    const [city, setCity] = useState({ Code: "", Name: "" });
    const [town, setTown] = useState({ Id: "", Name: "" });
    const [road, setRoad] = useState({ SrcName: "", Name: "" });
    const [lane, setLane] = useState("");
    const [alley, setAlley] = useState("");
    const [no, setNo] = useState("");

    const [townList, setTownList] = useState([]);
    const [roadList, setRoadList] = useState([]);
    const [doorList, setDoorList] = useState([]);
    const [buildingList, setBuildingList] = useState([]);
    const [buildingDetail, setBuildingDetail] = useState("");

    const getToken = async () => {
        const response = await fetch("/pages/setToken.jsp", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        });
        return response.text();
    };

    const getTownList = () => {
        getToken().then(async (result) => {
            const token = result.slice(134, 166);
            let dataObj = { doorPlateType: "A", "struts.token.name": "token", token: token };

            dataObj["cityCode"] = city.Code;
            dataObj["cityName"] = city.Name;

            const response = await fetch("City_json_getTownList", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: new URLSearchParams(dataObj),
            });

            setTownList(await response.json());
        });
    };

    const getRoadList = () => {
        getToken().then(async (result) => {
            const token = result.slice(134, 166);
            let dataObj = { doorPlateType: "A", "struts.token.name": "token", token: token };

            dataObj["cityCode"] = city.Code;
            dataObj["area"] = town.Id;

            const response = await fetch("City_json_getRoadList", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: new URLSearchParams(dataObj),
            });

            setRoadList(await response.json());
        });
    };

    const getDoorList = () => {
        getToken().then(async (result) => {
            const token = result.slice(134, 166);
            let dataObj = { doorPlateType: "A", "struts.token.name": "token", token: token };

            dataObj["city"] = city.Code;
            dataObj["area"] = town.Id;
            dataObj["lane"] = lane;
            dataObj["alley"] = alley;
            dataObj["no"] = no;
            dataObj["road"] = road.Name;
            dataObj["doorPlate"] = road.Name;
            dataObj["townName"] = town.Name;
            dataObj["cityName"] = city.Name;

            const response = await fetch("Door_json_getDoorList", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: new URLSearchParams(dataObj),
            });
            setDoorList((await response.json()).results);
        });
    };

    const getBuildingDetail = (index, item) => {
        if (item.mergeSameDoorCount > 0) {
            getToken().then(async (result) => {
                const token = result.slice(134, 166);
                let dataObj = { doorPlateType: "A", "struts.token.name": "token", token: token };

                dataObj["city"] = city.Code;
                dataObj["area"] = town.Id;
                dataObj["road"] = road.Name;
                dataObj["doorPlate"] = item.Road;

                const response = await fetch("Door_json_getFullDoorListByA", {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                    body: new URLSearchParams(dataObj),
                });
                setBuildingList((await response.json()).results);
            });
        } else {
            getToken().then(async (result) => {
                const token = result.slice(134, 166);
                let dataObj = { doorPlateType: "A", "struts.token.name": "token", token: token };

                dataObj["office"] = item.office;
                dataObj["sectNo"] = item.sectno;
                dataObj["buildingNo"] = item.buildno;

                const response = await fetch("BuildingDesc_ajax_detail", {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                    body: new URLSearchParams(dataObj),
                });
                setBuildingDetail(await response.text());
            });
        }
    };

    const Detail = () => {
        return (
            <>
                <Button variant="contained" onClick={() => setBuildingDetail("")}>
                    上一頁
                </Button>
                {parse(buildingDetail)}
            </>
        );
    };
    useEffect(() => {
        if (city.Name !== "") {
            getTownList();
            setTown({ Id: "", Name: "" });
            setRoad({ Id: "", Name: "" });
        }
    }, [city]);

    useEffect(() => {
        if (town.Name !== "") {
            getRoadList();
            setRoad({ Id: "", Name: "" });
        }
    }, [town]);

    useEffect(() => {
        setBuildingDetail("");
    }, [doorList]);

    const renderRow = (props) => {
        const { index, style } = props;
        const item = doorList[index];
        return (
            <ListItem key={item.Id} style={style} button onClick={() => getBuildingDetail(index,item)}>
                <ListItemText primary={item.Road} />
                <ListItemIcon>
                    <DoubleArrowIcon />
                </ListItemIcon>
            </ListItem>
        );
    };

    const BuildingList = () => {
        const renderBuilding = (props) => {
            const { index, style } = props;
            const item = buildingList[index];
            return (
                <ListItem key={item.Id} style={style} button onClick={() => getBuildingDetail(index, item)}>
                    <ListItemText primary={item.Road} />
                    <ListItemIcon>
                        <DoubleArrowIcon />
                    </ListItemIcon>
                </ListItem>
            );
        };
        return (
            <>
                <Button variant="contained" onClick={() => setBuildingList([])}>
                    上一頁
                </Button>
                <div className={classes.root}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <FixedSizeList
                                className="List"
                                height={height}
                                itemCount={buildingList.length}
                                itemSize={50}
                                width={width}
                            >
                                {renderBuilding}
                            </FixedSizeList>
                        )}
                    </AutoSizer>
                </div>
            </>
        );
    };
    return (
        <Container>
            <br />
            <Typography variant="h6" color="textSecondary" align="left">
                面積換算
            </Typography>
            <br />
            <Paper>
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <Grid container spacing={0}>
                                    <Grid item md={6} xs={6}>
                                        <FormControl variant="filled" className={classes.formControl} fullWidth>
                                            <InputLabel>縣市</InputLabel>
                                            <Select value={city.Name} fullWidth>
                                                {counties.map((item) => (
                                                    <MenuItem
                                                        key={item.Code}
                                                        value={item.Name}
                                                        onClick={() => setCity({ Code: item.Code, Name: item.Name })}
                                                    >
                                                        {item.Name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={6} xs={6}>
                                        <FormControl variant="filled" className={classes.formControl} fullWidth>
                                            <InputLabel>鄉鎮市區</InputLabel>
                                            <Select value={town.Name} fullWidth>
                                                {townList.map((item) => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.name}
                                                        onClick={() => setTown({ Id: item.id, Name: item.name })}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <FormControl variant="filled" className={classes.formControl} fullWidth>
                                    <InputLabel>道路</InputLabel>
                                    <Select value={road.Name} fullWidth>
                                        {roadList.map((item) => (
                                            <MenuItem
                                                key={item.srcName}
                                                value={item.name}
                                                onClick={() => setRoad({ SrcName: item.srcName, Name: item.name })}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <TextField
                                    label="巷"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    fullWidth
                                    onChange={(event) => setLane(event.target.value)}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <TextField
                                    label="弄"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    fullWidth
                                    onChange={(event) => setAlley(event.target.value)}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <TextField
                                    label="號"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    fullWidth
                                    onChange={(event) => setNo(event.target.value)}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <br />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <Button color="primary" variant="contained" fullWidth onClick={getDoorList}>
                                    查詢
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <Divider />
                <br />
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="90%">
                                <Paper>
                                    {buildingDetail === "" ? (
                                        buildingList.length === 0 ? (
                                            doorList.length > 0 && (
                                                <div className={classes.root}>
                                                    <AutoSizer>
                                                        {({ height, width }) => (
                                                            <FixedSizeList
                                                                className="List"
                                                                height={height}
                                                                itemCount={doorList.length}
                                                                itemSize={50}
                                                                width={width}
                                                            >
                                                                {renderRow}
                                                            </FixedSizeList>
                                                        )}
                                                    </AutoSizer>
                                                </div>
                                            )
                                        ) : (
                                            <BuildingList />
                                        )
                                    ) : (
                                        <Detail />
                                    )}
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Easymap;
