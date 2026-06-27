import { useRef } from "react"

const UseRefWorkingWithAttribute = () => {
    let data = useRef();
    let clickCount = 0;
    const handleClick = () => {
        clickCount++;
        if(clickCount === 1){
                    data.current.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXanKdbEmrTv5k5fEh0oHlTHFJgqEZ-fOicPA4uBoiog&s";
        data.current.setAttribute("height", "500");
        data.current.setAttribute("width", "700")
        } else {
            data.current.src = "https://pbs.twimg.com/media/HKyGMGMasAAHL0G?format=jpg&name=360x360";
            data.current.setAttribute("height", "auto");
            data.current.setAttribute("width", "auto");
        }
    }
    return (
        <div>
            <img ref={data} height={300} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALUAwgMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAMCAQcF/8QALhABAAIBAgIIBgIDAAAAAAAAAAEDAgQREpITFDE0UlNy4SEyQVFzoSLBJGFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAZEQEBAQEBAQAAAAAAAAAAAAAAAREhMUH/2gAMAwEAAhEDEQA/APtgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACa2+ybZp0+MTlHzZT2YvODW+dXy+y4aqEvR6zz6+X2Oj1nn18vsYmqhL0es8+vl9jo9Z59fL7GGqhL0es8+vl9nk3X6eY6xGOVcztx4/Qw1WPHqKAAAAAAAAAAAAAAAAl0PbfP1myVSXQ9l35ZVLfSACAPJ7J2naXNcZY4RGeXFlHblttuDtjq4301m/hbMdV3a30yQe6ad9PV6YastL3ar0w1KAAAAAAAAAAAAAAAAJdD2XfllUl0PZd+WXeov6PbDCOK3L5cVvqfHt+orp2jLecp7McY3lxhrK5yjHPHOuZ7OONnWno6PfPOeK3L5smlteNuE4ZxvE/o4ddiOqzLT5xTfO+M/Jn/AFLvUX5cfQ0fG2e2fpiYapY6ru1vpll1PLbedRbx/fdnZdnhVZRqPn4Z4cvpkSGqtL3ar0w1ZaXu1XphqlUAAAAAAAAAAAAAAAB+dTf0UW4YRxW5WTwx/arT0dHvnnPFbl82TLQ448V2e38ukmN/9LFqQARXFteNuE4ZxvE/pJp/8S2arYjbOf42ff8A6ucW1424ThnG8T+llTHbDW4Y5afOco+OMbxP2a14cGGOG8ztG28s9V3a30yk9V7pe7VemGrLS92q9MNSgAAAAAAAAAAAAAAACPTZRVfbTn8Jyy4sd/rus2Z3U13RtZjv9p+zDqFPis5l5UV7GyTqFXis5jqFXis5jh1XsbJOoVeKzmOoVeKzmOHVeybXWRhTlh255/CMfq56hV4rOZpTpaqcuLHHfL75TvJw60pxnCrDCe3HGIl2CKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==" alt="place holder image" />
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default UseRefWorkingWithAttribute;