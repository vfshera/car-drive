<?php

namespace App\Http\Controllers;

use App\Events\NewMessageEvent;
use App\Models\User;
use Carbon\Carbon;
use Cmgmyr\Messenger\Models\{
    Message,
    Participant,
    Thread
};
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Resources\{
    ChatThreadViewResource,
    ThreadResource
};
use Symfony\Component\HttpFoundation\Response;

class MessagesController extends Controller
{
     /**
     * Show all of the message threads to the user.
     *
     * @return mixed
     */
    public function index()
    {
        $threads = Thread::forUser(Auth::id())
            ->withCount('messages')
            ->latest()
            ->get()
            ->sortByDesc(function($thread){
                return $thread->latest_message->created_at;
            });
            

        return ThreadResource::collection($threads)->response()->setStatusCode(Response::HTTP_OK);
    }

    /**
     * Shows a message thread.
     *
     * @param $id
     * @return mixed
     */
    public function show(Thread $thread)
    {
        // $thread->markAsRead(Auth::id());

        // $thread->with('messages')->get();


        return new ChatThreadViewResource($thread);

    }

    /**
     * Creates a new message thread.
     *
     * @return mixed
     */
    public function recipients()
    {
  

        // LONG USER FILTER

        $userThreadID =  Participant::where('user_id',  Auth::id())->get()->pluck('thread_id');
    
        $threads =  Thread::whereIn('id', $userThreadID)->get();    
    
        $notAllowedIDs =  $threads->map(function($thread){
            return $thread->participantsUserIds();
        })->flatten()->unique()->values()->all();


        array_push($notAllowedIDs , Auth::id());




        $users = User::whereNotIn('id', $notAllowedIDs)->get();

        return response(['recipients' => $users] , Response::HTTP_OK);
    }

    /**
     * Stores a new message thread.
     *
     * @return mixed
     */
    public function create(Request $request)
    {


        $thread = Thread::create([
            'subject' => $request->subject,
        ]);

        // Message
        Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => $request->message,
        ]);

        // Sender
        Participant::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'last_read' => new Carbon,
        ]);

        // Recipients
        $thread->addParticipant($request->recipient);


        return response(['message' => 'Message sent successfully!'] , Response::HTTP_CREATED);
    }

    /**
     * Adds a new message to a current thread.
     *
     * @param $id
     * @return mixed
     */
    public function update(Request $request, Thread $thread)
    {
        $thread->activateAllParticipants();

        Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => $request->message,
        ]);

        $participant = Participant::firstOrCreate([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
        ]);

        $participant->last_read = new Carbon;
        $participant->save();

        broadcast(new NewMessageEvent($thread->id));


        return response(['message' => 'Message updated successfully!'] , Response::HTTP_CREATED);
    }

    public function destroyMessage(Message $message)
    {

        $threadID = $message->thread->id;
        
        $message->delete();

        broadcast(new NewMessageEvent($threadID));


        return response(['message' => 'Message deleted successfully!'] , Response::HTTP_OK);
    }



    public function destroy(Thread $thread)
    {
        $thread->removeParticipant(Auth::id());

        return response(['message' => 'Message deleted successfully!'] , Response::HTTP_OK);
    }
}

