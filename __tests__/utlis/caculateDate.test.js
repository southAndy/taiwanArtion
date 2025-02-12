import dayjs from "dayjs";

describe("計算特定的月份", () => {
  test("測試標準日期格式", () => {
    const fakeDate = "1995/12/05";
    expect(dayjs(fakeDate).month()).toBe(11);
  });

  test("測試其他日期格式 - YYYY-MM-DD", () => {
    const fakeDate = "1995-12-05";
    expect(dayjs(fakeDate).month()).toBe(11);
  });

  test("測試其他日期格式 - MM-DD-YYYY", () => {
    const fakeDate = "12-05-1995";
    expect(dayjs(fakeDate, "MM-DD-YYYY").month()).toBe(11);
  });

  test("測試其他日期格式 - DD/MM/YYYY", () => {
    const fakeDate = "05/12/1995";
    expect(dayjs(fakeDate, "DD/MM/YYYY").month()).toBe(11);
  });

  test("測試其他日期格式 - DD-MM-YYYY", () => {
    const fakeDate = "05-12-1995";
    expect(dayjs(fakeDate, "DD-MM-YYYY").month()).toBe(11);
  });
});
