function timer (id, deadline) {
   
    function getTimeRemeining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return `${num}`;
        }
    }

    function setCloak(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector(`#days`),
            hours = document.querySelector(`#hours`),
            minutes = document.querySelector(`#minutes`),
            seconds = document.querySelector(`#seconds`),
            timeinterval = setInterval(() => {
                updateClock();
            }, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemeining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
    }
    setCloak(id, deadline);
}

export default timer;