import { defineStore } from 'pinia';
import type { CalEvent } from '@/interfaces/event';
import { addEvent, deleteEvent, getEvents, updateEvent } from '@/api/event';
import { format, parseISO } from 'date-fns';

export const useEventStore = defineStore({
    id: 'events',
    state: () => ({
        /*user: JSON.parse(localStorage.getItem('user')),*/
        events: [] as Array<Event>
    }),
    getters: {
        GET_BY_ID: (state) => (id: string) => {
            // @ts-ignore
            const event = state.events.find((item) => item.id === id);
            return { ...event };
        }
    },
    actions: {
        async FETCH_EVENTS() {
            try {
                const data = await getEvents();
                const res_events: Array<Event> = data.map((item: any) => {
                    const event: CalEvent = {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        location: item.location,
                        time: {
                            start: format(parseISO(item.start_datetime), 'yyyy-MM-dd HH:mm'),
                            end: format(parseISO(item.end_datetime), 'yyyy-MM-dd HH:mm')
                        },
                        color: item.color,
                        is_public: item.is_public,
                        recurring: item.is_recurring,
                        isEditable: true,
                        isCustom: false
                    } as CalEvent;
                    return event;
                });
                this.events = res_events;
                return this.events;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async ADD_EVENT(event: CalEvent) {
            try {
                const data = await addEvent(event);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UPDATE_EVENT(event: CalEvent) {
            try {
                const data = await updateEvent(event);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async DELETE_EVENT(eventId: string) {
            try {
                const data = await deleteEvent(eventId);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        }
    }
});
