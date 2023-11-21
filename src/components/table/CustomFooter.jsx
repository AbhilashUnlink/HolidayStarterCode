import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import React from "react";

const CustomFooter = ({
  count,
  setSkip,
  take,
  skip,
  setTake,
  initialRowCount,
  showFooter = true,
}) => {
  const theme = useTheme();

  // Pagination action buttons

  const handleBackToFirstPage = () => {
    setSkip(0);
  };

  const handleNextToLastPage = () => {
    setSkip(count - take);
  };

  const handleBackButtonClick = () => {
    setSkip((prev) => prev - take);
  };
  const handleNextButtonClick = () => {
    setSkip((prev) => prev + take);
  };

  //  some inline css as external css is not working ....need to check it with Abhishek sir

  const handleChange = (event) => {
    setTake(event.target.value);
  };

  return (
    <>
      <div className="footer">
        {showFooter ? (
          <>
            <div className="footer-left">
              <FormControl className="select-rows" size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={take}
                  label="take"
                  onChange={handleChange}
                >
                  <MenuItem value={initialRowCount}>{initialRowCount}</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={35}>35</MenuItem>
                  <MenuItem value={40}>40</MenuItem>
                  <MenuItem value={45}>45</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
              <div className="rowsperpage"></div>
            </div>
            <div className="footer-right">
              <span className="rowcount">
                <strong> {skip + 1} </strong> to
                <strong> {take + skip} </strong> of
                <strong> {count} </strong>
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <IconButton
                onClick={handleBackToFirstPage}
                disabled={skip === 0}
                aria-label="first page"
              >
                {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
              </IconButton>
              <IconButton
                onClick={handleBackButtonClick}
                disabled={skip === 0}
                aria-label="previous page"
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </IconButton>
              <span className="rowcount">
                Page
                <strong> {Math.ceil((take + skip) / take)} </strong> of{" "}
                <strong>{Math.ceil(count / take)}</strong>
              </span>
              <IconButton
                onClick={handleNextButtonClick}
                disabled={take + skip === count}
                aria-label="previous page"
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </IconButton>
              <IconButton
                onClick={handleNextToLastPage}
                disabled={take + skip === count}
                aria-label="last page"
              >
                {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
              </IconButton>
            </div>
          </>
        ) : (
          <strong></strong>
        )}
      </div>
    </>
  );
};

export default CustomFooter;
